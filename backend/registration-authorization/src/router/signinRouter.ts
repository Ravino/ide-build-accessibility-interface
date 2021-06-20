import { Container } from 'typescript-ioc';
import { Router } from 'express';
import { Request, Response, NextFunction } from 'express';
import { EmailRouter } from './emailRouter';
import { VkontakteRouter } from './vkontakteRouter';
import { AccessMiddleware } from '../middleware/accessMiddleware';


export class SigninRouter {

  public middleware(req: Request, res: Response, next: NextFunction): any {
    Container.get(AccessMiddleware).checkExistSession(req, res, next);
    return 
  }


  public handler(): Router {

    const router: Router = Router();


    router.use('/email',
      Container.get(EmailRouter).handler
    );
    router.use('/vkontakte',
      Container.get(VkontakteRouter).handler
    );


    return router;
  }
}
