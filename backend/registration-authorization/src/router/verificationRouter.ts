import { Container } from 'typescript-ioc';
import { Router } from 'express';
import { Request, Response, NextFunction } from 'express';
import { VerificationPasswordRouter } from './verificationPasswordRouter';
import { VerificationEmailRouter } from './verificationEmailRouter';
import { AccessMiddleware } from '../middleware/accessMiddleware';


export class VerificationRouter {

  public middleware(req: Request, res: Response, next: NextFunction): any {
    Container.get(AccessMiddleware).checkExistSession(req, res, next);
    return 
  }


  public handler(): Router {

    const router: Router = Router();


    router.use('/email',
      Container.get(VerificationEmailRouter).handler
    );
    router.use('/password',
      Container.get(VerificationPasswordRouter).handler
    );


    return router;
  }
}
