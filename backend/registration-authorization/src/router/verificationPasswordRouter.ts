import { Container } from 'typescript-ioc';
import { Request } from 'express';
import { Response } from 'express';
import { VerificationPasswordResolver } from '../resolver/verificationPasswordResolver';
import { StatusView } from '../view/statusView';


export class VerificationPasswordRouter {

  public async handler(req: Request, res: Response): Promise<undefined> {
    await Container.get(VerificationPasswordResolver).done(req, res);
    return undefined;
  }
}
