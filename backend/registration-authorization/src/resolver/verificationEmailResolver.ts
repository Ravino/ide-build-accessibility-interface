import { Inject } from 'typescript-ioc';
import trim from 'trim';
import { LinkService } from '../service/linkService';
import { UserService } from '../service/userService';
import { Request } from 'express';
import { Response } from 'express';
import { StatusView } from '../view/statusView';


export class VerificationEmailResolver {

  private readonly statusView: StatusView = new StatusView();


  public constructor(
    @Inject private readonly linkService: LinkService,
    @Inject private readonly userService: UserService
  ){}


  public async email(req: Request, res: Response): Promise<any> {

    let token: string = <string>req.query.token || '';
    token = trim(token);


    let existUser: any;
    try {
      existUser = await this.linkService.getByNamespaceKey('verification:email', token);
      existUser = JSON.parse(existUser);
    }
    catch(err) {
      console.log(err);
      this.statusView.addStatus('notSuccess');
      return this.statusView;
    }


    let result: any;
    try {
      result = await this.userService.updateByNameField('email', existUser.email, 'confirmed', true);
      console.log(result);
    }
    catch(err) {
      this.statusView.addStatus('notSuccess');
      return this.statusView;
    }


    this.linkService.deleteByNamespaceKey('verification:email', token);


    this.statusView.addStatus('success');
    return this.statusView;
  }


  public async done(req: Request, res: Response): Promise<any> {
    const result = await this.email(req, res);
    res.json(result);
  }
}
