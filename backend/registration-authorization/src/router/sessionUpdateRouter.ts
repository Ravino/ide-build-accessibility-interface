import { Container } from 'typescript-ioc';
import { Request } from 'express';
import { Response } from 'express';
import { SessionUpdateResolver } from '../resolver/sessionUpdateResolver';
import { StatusView } from '../view/statusView';


export class SessionUpdateRouter {

  public async handler(req: Request, res: Response): Promise<undefined> {
    await Container.get(SessionUpdateResolver).done(req, res);
    return undefined;
  }
}
