import { Container } from 'typescript-ioc';
import { Router } from 'express';
import { Request, Response, NextFunction } from 'express';
import { AccessMiddleware } from '../middleware/accessMiddleware';


export class OtherRouter {

  public middleware(req: Request, res: Response, next: NextFunction): any {
    Container.get(AccessMiddleware).stub(req, res, next);
    return 
  }


  public handler(): any {
    return (req: Request, res: Response) => {}
  }
}
