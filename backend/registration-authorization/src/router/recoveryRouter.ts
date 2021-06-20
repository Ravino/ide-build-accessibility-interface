import { Container } from 'typescript-ioc';
import { Router } from 'express';
import { Request, Response, NextFunction } from 'express';
import { RecoveryPasswordRouter } from './recoveryPasswordRouter';
import { AccessMiddleware } from '../middleware/accessMiddleware';


export class RecoveryRouter {

  public middleware(req: Request, res: Response, next: NextFunction): any {
    Container.get(AccessMiddleware).checkExistSession(req, res, next);
    return 
  }


  public handler(): Router {

    const router: Router = Router();


    router.use('/password',
      Container.get(RecoveryPasswordRouter).handler
    );


    return router;
  }
}
