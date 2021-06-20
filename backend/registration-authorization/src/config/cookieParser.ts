import { readFileSync, realpathSync } from 'fs';
import { Application } from 'express';
import cookieParser from 'cookie-parser';


const publicKeyPath = realpathSync(`${__dirname}/../jwtRS256.key.pub`);
const publicKey = readFileSync(publicKeyPath, {encoding: "utf8"});


export const confSetCookie = {
  nameCookie: <string>global.process.env.CONF_SET_COOKIE_NAME || '',
  params: {
    domain: <string>global.process.env.CONF_SET_COOKIE_DOMAIN,
    httpOnly: true,
    path: '/',
    secure: true,
    signed: true
  }
};


export function cookieParserInitialization(server: Application) {
  server.use(cookieParser(publicKey));
  return undefined;
}
