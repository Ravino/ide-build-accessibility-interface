const { readFileSync, realpathSync } = require('fs');
const cookieParser = require('cookie-parser');

const publicKeyPath = realpathSync(`${__dirname}/../jwtRS256.key.pub`);
const publicKey = readFileSync(publicKeyPath, {encoding: "utf8"});


module.exports.confSetCookie = {
  nameCookie: global.process.env.CONF_SET_COOKIE_NAME || '',
  params: {
    domain: global.process.env.CONF_SET_COOKIE_DOMAIN,
    httpOnly: true,
    path: '/',
    secure: true,
    signed: true
  }
};


module.exports.cookieParserInitialization = (server) => {
  server.use(cookieParser(publicKey));
  return undefined;
}
