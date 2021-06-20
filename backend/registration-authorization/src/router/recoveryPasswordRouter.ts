import { Container } from 'typescript-ioc';
import { Request } from 'express';
import { Response } from 'express';
import { RecoveryPasswordResolver } from '../resolver/recoveryPasswordResolver';
import { StatusView } from '../view/statusView';


export class RecoveryPasswordRouter {

  public async handler(req: Request, res: Response): Promise<undefined> {
    await Container.get(RecoveryPasswordResolver).done(req, res);
    return undefined;
  }
}
