import { Container } from 'typescript-ioc';
import { Router } from 'express';
import { Request, Response, NextFunction } from 'express';
import { SessionUpdateRouter } from './sessionUpdateRouter';
import { SessionDestroyRouter } from './sessionDestroyRouter';
import { AccessMiddleware } from '../middleware/accessMiddleware';


export class SessionRouter {

  public middleware(req: Request, res: Response, next: NextFunction): any {
    Container.get(AccessMiddleware).checkNotExistSession(req, res, next);
    return 
  }


  public handler(): Router {

    const router: Router = Router();


    router.use('/update',
      Container.get(SessionUpdateRouter).handler
    );
    router.use('/destroy',
      Container.get(SessionDestroyRouter).handler
    );


    return router;
  }
}
