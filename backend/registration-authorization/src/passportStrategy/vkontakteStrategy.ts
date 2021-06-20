import { Container } from 'typescript-ioc';
import { configStrategyVkontakte } from '../config/passport';
import { UserService } from '../service/userService';
import { AuthorizationService } from '../service/authorizationService';
import { Strategy } from 'passport-vkontakte';


export const vkontakteStrategy = () => new Strategy(configStrategyVkontakte, async (accessToken: string, refreshToken: string, params: any, profile: any, done: any) => {

  let existUser: any;
  try {
    existUser = await Container.get(UserService).getByNameField('vkontakte_profile_id', params.user_id);
  }
  catch(err) {
    console.log(err);
    done(null, false, { message: 'notSuccess'});
    return undefined;
  }


  if(!existUser) {
    const profileName = profile.name;
    try {
      await Container.get(UserService).create(profileName.givenName, profileName.familyName, '', true, null, params.user_id);
    }
    catch(err) {
      console.log(err);
      done(null, false, { message: 'notSuccess'});
      return undefined;
    }
  }


  try {
    existUser = await Container.get(UserService).getByNameField('vkontakte_profile_id', params.user_id);
  }
  catch(err) {
    console.log(err);
    done(null, false, { message: 'notSuccess'});
    return undefined;
  }


  if(!existUser) {
    done(null, false, { message: 'notSuccess'});
    return undefined;
  }


  let pairToken: any;
  try {
    pairToken = await Container.get(AuthorizationService).getPairToken(existUser);
  }
  catch(err) {
    console.log(err);
    done(null, false, { message: 'notSuccess'});
    return undefined;
  }


  const result = {
    user: existUser,
    pairToken: pairToken
  };


  done(null, result, { message: 'success'});
  return undefined;
});
