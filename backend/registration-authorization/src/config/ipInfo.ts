import { Application } from 'express';
import ipInfo from '@bosscat/express-ip';


export function ipInfoInitialization(server: Application) {
  server.use(ipInfo());
  return undefined;
}
