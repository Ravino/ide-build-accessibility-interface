import { Inject } from 'typescript-ioc';
import trim from 'trim';
import { LinkService } from '../service/linkService';
import { UserService } from '../service/userService';
import {SessionService} from '../service/sessionService';
import { Request } from 'express';
import { Response } from 'express';
import { StatusView } from '../view/statusView';


export class VerificationPasswordResolver {

  private readonly statusView: StatusView = new StatusView();


  public constructor(
    @Inject private readonly linkService: LinkService,
    @Inject private readonly userService: UserService,
    @Inject private readonly sessionService: SessionService
  ){}


  public async password(req: Request, res: Response): Promise<any> {

    let token: string = <string>req.query.token || '';
    token = trim(token);


    let existUser: any;
    try {
      existUser = await this.linkService.getByNamespaceKey('verification:password', token);
      existUser = JSON.parse(existUser);
    }
    catch(err) {
      console.log(err);
      this.statusView.addStatus('notSuccess');
      return this.statusView;
    }


    let result: any;
    try {
      result = await this.userService.updateByNameField('user_id', existUser.userId, 'password', existUser.password);
      console.log(result);
    }
    catch(err) {
      this.statusView.addStatus('notSuccess');
      return this.statusView;
    }


    this.sessionService.deleteByNameField('user_id', existUser.userId);
    this.linkService.deleteByNamespaceKey('verification:password', token);


    this.statusView.addStatus('success');
    return this.statusView;
  }


  public async done(req: Request, res: Response): Promise<any> {
    const result = await this.password(req, res);
    res.json(result);
  }
}
