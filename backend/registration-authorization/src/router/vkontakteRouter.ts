import { Container } from 'typescript-ioc';
import { Request } from 'express';
import { Response } from 'express';
import { VkontakteResolver } from '../resolver/vkontakteResolver';
import { StatusView } from '../view/statusView';


export class VkontakteRouter {

  public handler(req: Request, res: Response) {
Container.get(VkontakteResolver).done(req, res);
  }
}
