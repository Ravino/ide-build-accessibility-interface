import { Container } from 'typescript-ioc';
import { Application } from 'express';
import { Router } from 'express';
import { SigninRouter } from '../router/signinRouter';
import { SessionRouter } from '../router/sessionRouter';
import { RecoveryRouter } from '../router/recoveryRouter';
import { VerificationRouter } from '../router/verificationRouter';
import { OtherRouter } from '../router/otherRouter';


const router: Router = Router();


router.use('/signin',
  Container.get(SigninRouter).middleware,
  Container.get(SigninRouter).handler()
);


router.use('/session',
  Container.get(SessionRouter).middleware,
  Container.get(SessionRouter).handler()
);


router.use('/recovery',
  Container.get(RecoveryRouter).middleware,
  Container.get(RecoveryRouter).handler()
);


router.use('/verification',
  Container.get(VerificationRouter).middleware,
  Container.get(VerificationRouter).handler()
);


router.use('/*',
  Container.get(OtherRouter).middleware,
  Container.get(OtherRouter).handler()
);


export function routerInitialization(server: Application) {
  server.use(router);
}
