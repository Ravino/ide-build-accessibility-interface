import { Inject } from 'typescript-ioc';
import { confSetCookie } from '../config/cookieParser';
import { authenticate as authenticatePassport} from 'passport';
import { Request } from 'express';
import { Response } from 'express';
import { StatusView } from '../view/statusView';
import { SessionService } from '../service/sessionService';


export class VkontakteResolver {

  private readonly statusView: StatusView = new StatusView();


  public constructor(
    @Inject private readonly sessionService: SessionService
  ) {}


  public async authenticate(req: Request, res: Response): Promise<any> {

    authenticatePassport('vkontakte', async (err, payload, info) => {

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


  public async done(req: Request, res: Response): Promise<any> {
        await this.authenticate(req, res);
  }
}
