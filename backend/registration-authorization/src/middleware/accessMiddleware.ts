import trim from 'trim';
import { confSetCookie } from '../config/cookieParser';
import { Request, Response, NextFunction } from 'express';
import { StatusView } from '../view/statusView';


export class AccessMiddleware {

  private readonly statusView: StatusView = new StatusView();


  public checkExistSession(req: Request, res: Response, next: NextFunction): any {

    let accessToken: string = req.signedCookies[confSetCookie.nameCookie] || '';
    accessToken = trim(accessToken);


    if(!accessToken) {
      next();
      return undefined;
    }


    this.statusView.addStatus('authenticate');
    res.json(this.statusView);
    return undefined;
  }


  public checkNotExistSession(req: Request, res: Response, next: NextFunction): any {

    let accessToken: string = req.signedCookies[confSetCookie.nameCookie] || '';
    let refreshToken: string = req.body.refreshToken || '';


    accessToken = trim(accessToken);
    refreshToken = trim(refreshToken);


    if(accessToken && refreshToken) {
      next();
      return undefined;
    }


    this.statusView.addStatus('notAuthenticate');
    res.clearCookie(confSetCookie.nameCookie);
    res.json(this.statusView);
    return undefined;
  }


  public stub(req: Request, res: Response, next:NextFunction): any {
    res.sendStatus(403)
    return undefined;
  }
}
