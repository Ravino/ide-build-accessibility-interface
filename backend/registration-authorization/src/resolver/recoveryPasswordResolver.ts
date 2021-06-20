import { Inject } from 'typescript-ioc';
import escapeHtml from 'escape-html';
import trim from 'trim';
import { RecoveryService } from '../service/recoveryService';
import { UserService } from '../service/userService';
import { LinkService } from '../service/linkService';
import { MailerService } from '../service/mailerService';
import { Request, Response } from 'express';
import { StatusView } from '../view/statusView';
import accepts from 'accepts';


export class RecoveryPasswordResolver {

  private readonly statusView: StatusView = new StatusView();


  public constructor(
    @Inject private readonly recoveryService: RecoveryService,
    @Inject private readonly userService: UserService,
    @Inject private readonly linkService: LinkService,
    @Inject private readonly mailerService: MailerService
  ){}


  public async recovery(req: Request, res: Response): Promise<any> {

    let email: string = req.body.email || '';


    email = escapeHtml(email);
    email = trim(email);


    if(!this.recoveryService.validateEmail(email)) {
      this.statusView.addStatus('invalidEmail');
      return this.statusView;
    }


    let existUser: any;
    try {
      existUser = await this.userService.getByNameField('email', email);
    }
    catch(err) {
      console.log(err);
      this.statusView.addStatus('notSuccess');
      return this.statusView;
    }


    if(!existUser) {
      this.statusView.addStatus('invalidEmail');
      return this.statusView;
    }



    const password: string = this.recoveryService.generatePassword();
    let hashPassword: string = '';
    try {
      hashPassword = await this.recoveryService.hashPassword(password);
    }
    catch(err) {
      console.log(err);
      this.statusView.addStatus('notSuccess');
      return this.statusView;
    }


    const user = {
      userId: existUser.USER_ID,
      email: email,
      password: hashPassword
    }


    const userStringify: string = JSON.stringify(user);
    let link: string|undefined;
    try {
      link = await this.linkService.create('verification:password', userStringify, 1800);
    }
    catch(err) {
      console.log(err);
      this.statusView.addStatus('notSuccess');
      return this.statusView;
    }


    if(!link) {
      this.statusView.addStatus('notSuccess');
      return this.statusView;
    }


    const language: string = accepts(req).languages()[1] || '';


    this.mailerService.sender('recoveryPassword', user.email, password, link, language);
    this.statusView.addStatus('success');
    return this.statusView;
  }


  public async done(req: Request, res: Response): Promise<any> {
    const result = await this.recovery(req, res);
    res.json(result);
  }
}
