import { Application } from 'express';
import helmet from 'helmet';


export function helmetInitialization(server: Application) {
  server.use(helmet.hidePoweredBy());
  return undefined;
}
