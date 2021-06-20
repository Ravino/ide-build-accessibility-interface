const listEnvVar: Array<string> = [
  'TARANTOOL_PORT',
  'TARANTOOL_HOST',
  'TARANTOOL_USER_NAME',
  'TARANTOOL_USER_PASSWORD',
  'VKONTAKTE_CLIENT_ID',
  'VKONTAKTE_CLIENT_SECRET',
  'VKONTAKTE_CALLBACK_URL',
  'VKONTAKTE_SCOPE',
  'VKONTAKTE_PROFILE_FIELDS',
  'IOREDIS_HOST',
  'IOREDIS_PORT',
  'CONF_SET_COOKIE_NAME',
  'MAILER_LANGUAGE_DEFAULT'
];


export function environmentInitialization() {

  let status: string = 'success';
  for(let i of listEnvVar) {
    if(!global.process.env[i]) {
      console.log(`Empty env var ${ i }`);
      status = 'notSuccess';
    }
  }


  if(status == 'notSuccess') {
    global.process.exit();
  }
}
