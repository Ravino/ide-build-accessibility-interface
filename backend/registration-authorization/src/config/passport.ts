import { Application } from 'express';
import passport from 'passport';
import { IStrategyOptions as IStrategyOptionsEmail } from 'passport-local';
import { StrategyOptions as IStrategyOptionsVkontakte } from 'passport-vkontakte';
import { emailStrategy } from '../passportStrategy/emailStrategy';
import { vkontakteStrategy } from '../passportStrategy/vkontakteStrategy';


export function passportInitialization(server: Application) {
  server.use(passport.initialize());
}


export const configStrategyEmail = <IStrategyOptionsEmail>{
  username: 'username',
  password: 'password',
  session: false,
  passReqToCallback: false
};


export const configStrategyVkontakte = <IStrategyOptionsVkontakte>{
  clientID: <string>global.process.env.VKONTAKTE_CLIENT_ID,
  clientSecret: <string>global.process.env.VKONTAKTE_CLIENT_SECRET,
  callbackURL: <string>global.process.env.VKONTAKTE_CALLBACK_URL,
  scope: String(global.process.env.VKONTAKTE_SCOPE).split('|'),
  profileFields: String(global.process.env.VKONTAKTE_PROFILE_FIELDS).split('|')
}


passport.use('email', emailStrategy());
passport.use('vkontakte', vkontakteStrategy());
