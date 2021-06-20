import { Inject } from 'typescript-ioc';
import escapeHtml from 'escape-html';
import trim from 'trim';
import { confSetCookie } from '../config/cookieParser';
import { UserService } from '../service/userService';
import { RegistrationService } from '../service/registrationService';
import { SessionService } from '../service/sessionService';
import { LinkService } from '../service/linkService';
import { MailerService } from '../service/mailerService';
import { authenticate as authenticatePassport} from 'passport';
import { Request, Response } from 'express';
import { StatusView } from '../view/statusView';
import accepts from 'accepts';


export class EmailResolver {

  private readonly statusView: StatusView = new StatusView();


  public constructor(
    @Inject private readonly userService: UserService,
    @Inject private readonly registrationService: RegistrationService,
    @Inject private readonly sessionService: SessionService,
    @Inject private readonly linkService: LinkService,
    @Inject private readonly mailerService: MailerService
  ){}


  public async authenticate(req: Request, res: Response): Promise<any> {

    authenticatePassport('email', async (err, payload, info) => {

      if(err) {
        console.log(err);
        this.statusView.addStatus('notSuccess');
        res.json(this.statusView);
        return undefined;
      }


      if(info.message !== 'success') {
        this.statusView.addStatus(info.message);
        res.json(this.statusView);
        return undefined;
      }


      let result: boolean = false;
      try {
        result = await this.sessionService.create(req, payload);
      }
      catch(err) {
        console.log(err);
        result = false;
      }

      if(!result) {
        this.statusView.addStatus('notSuccess');
        res.json(this.statusView);
        return undefined;
      }

      const accessToken = payload.pairToken.accessToken;
      delete payload.pairToken.accessToken;


      res.cookie(confSetCookie.nameCookie, accessToken, confSetCookie.params);
      this.statusView.addStatus(info.message);
      this.statusView.addData(payload.pairToken);
      res.json(this.statusView);
        return undefined;
    })(req, res);


    return undefined;
  }


  public async registrate(req: Request, res: Response): Promise<StatusView> {

    let firstname: string = escapeHtml(req.body.firstname || '');
    let lastname: string = escapeHtml(req.body.lastname || '');
    let email: string = escapeHtml(req.body.email || '');


    firstname = trim(firstname);
    lastname = trim(lastname);
    email = trim(email);


    const confirm: boolean = false;
    const validateEmail: boolean = this.registrationService.validateEmail(req.body.email);


    let existUser: any;
    try {
      existUser = await this.userService.getByNameField('email', email);
    }
    catch(err) {
      console.log(err);
    }


    if(existUser) {
      this.statusView.addStatus('existUser');
      return this.statusView;
    }


    const password = this.registrationService.generatePassword();
    const hash = await this.registrationService.hashPassword(password);


    try {
      await this.userService.create(firstname, lastname, hash, confirm, email, null);
    }
    catch(err) {
      console.log(err);
    }


    const user = {
      email
    }


    const userStringify: string = JSON.stringify(user);
    const link: any = await this.linkService.create('verification:email', userStringify, 1800);
    const language: string = accepts(req).languages()[1] || '';


    this.mailerService.sender('registration', email, password, link, language);
    this.statusView.addStatus('success');
    return this.statusView;
  }


  public async done(req: Request, res: Response): Promise<any> {

    if(req.body.method == 'registration') {
      const result = await this.registrate(req, res);
      res.json(result);
      return undefined;
    }


    if(req.body.method == 'authentication') {
      await this.authenticate(req, res);
      return undefined;
    }


    this.statusView.addStatus('invalidMethod');
    res.json(this.statusView);
    return undefined;
  }
}
