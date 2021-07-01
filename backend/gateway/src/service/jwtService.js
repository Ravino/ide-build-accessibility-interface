const {readFileSync, realpathSync} = require('fs');
const jwtVerify = require('jsonwebtoken').verify;
const jwtDecode = require('jsonwebtoken').decode;

class JWTService {

  constructor() {

    const privateKeyPath = realpathSync(`${__dirname}/../jwtRS256.key`);
    const publicKeyPath = realpathSync(`${__dirname}/../jwtRS256.key.pub`);


    this.privateKey = readFileSync(privateKeyPath, {encoding: "utf8"});
    this.publicKey = readFileSync(publicKeyPath, {encoding: "utf8"});
  }


  async verify(token) {

    let result;
    try {
      result = await jwtVerify(token, this.privateKey, { algorithms: ['RS256'] });
    }
    catch(err) {
      console.log(err);
      return false;
    }


    if(!result) {
      return false;
    }


    return true;
  }


  async decode(token) {

    let result;
    try {
      result = await jwtDecode(token);
    }
    catch(err) {
      console.log(err);
      return undefined;
    }


    if(!result) {
      return undefined;
    }


    return result;
  }
}


module.exports.JWTService = new JWTService();
