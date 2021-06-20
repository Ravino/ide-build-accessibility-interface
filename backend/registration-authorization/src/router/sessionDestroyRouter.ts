import { Container } from 'typescript-ioc';
import { Request } from 'express';
import { Response } from 'express';
import { SessionDestroyResolver } from '../resolver/sessionDestroyResolver';
import { StatusView } from '../view/statusView';


export class SessionDestroyRouter {

  public async handler(req: Request, res: Response): Promise<undefined> {
    await Container.get(SessionDestroyResolver).done(req, res);
    return undefined;
  }
}
