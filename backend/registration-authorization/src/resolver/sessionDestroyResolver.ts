import { Inject } from 'typescript-ioc';
import trim from 'trim';
import { confSetCookie } from '../config/cookieParser';
import { AuthorizationService } from '../service/authorizationService';
import { SessionService } from '../service/sessionService';
import { Request } from 'express';
import { Response } from 'express';
import { StatusView } from '../view/statusView';


export class SessionDestroyResolver {

  private readonly statusView: StatusView = new StatusView();


  public constructor(
    @Inject private readonly authorizationService: AuthorizationService,
    @Inject private readonly sessionService: SessionService,
  ){}


  public async destroy(req: Request, res: Response): Promise<any> {

    let currentRefreshToken: string = req.body.refreshToken || '';
    let currentAccessToken: string = req.signedCookies[confSetCookie.nameCookie] || '';


    currentRefreshToken = trim(currentRefreshToken);
    currentAccessToken = trim(currentAccessToken);


    let bindToken: string;
    try {
      bindToken = await this.authorizationService.bindToken(currentRefreshToken, currentAccessToken);
    }
    catch(err) {
      console.log(err);
      this.statusView.addStatus('notSuccess');
      return this.statusView;
    }


    let result: any;
    try {
      result = await this.sessionService.deleteByNameField('bind_token', bindToken);
    }
    catch(err) {
      console.log(err);
      this.statusView.addStatus('notSuccess');
      return this.statusView;
    }


    res.clearCookie(confSetCookie.nameCookie);
    this.statusView.addStatus('success');
    return this.statusView;
  }


  public async done(req: Request, res: Response): Promise<any> {
    const result = await this.destroy(req, res);
    res.json(result);
  }
}
