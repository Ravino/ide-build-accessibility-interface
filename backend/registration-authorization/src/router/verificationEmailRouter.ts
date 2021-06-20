import { Container } from 'typescript-ioc';
import { Request } from 'express';
import { Response } from 'express';
import { VerificationEmailResolver } from '../resolver/verificationEmailResolver';
import { StatusView } from '../view/statusView';


export class VerificationEmailRouter {

  public async handler(req: Request, res: Response): Promise<undefined> {
    await Container.get(VerificationEmailResolver).done(req, res);
    return undefined;
  }
}
