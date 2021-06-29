const trim = require('trim');
const { confSetCookie } = require('../config/cookieParser');
const JWTService = require('../service/jwtService');
const StatusView = require('../view/statusView');


class AccessMiddleware {

  constructor() {
    this.jwtService = JWTService;
  }


  async checkExistSession(req, res, next) {

    let accessToken = req.signedCookies[confSetCookie.nameCookie] || '';
    accessToken = trim(accessToken);


    if(!accessToken) {
      this.statusView.addStatus('notAuthenticate');
      res.json(this.statusView);
      return undefined;
    }


    const verifyToken = await this.jwtService.verify(accessToken);
    if(!verifyToken) {
      this.statusView.addStatus('notAuthenticate');
      res.json(this.statusView);
      return undefined;
    }


    const result = await this.jwtService.decode(accessToken);
    if(!result) {
      this.statusView.addStatus('notAuthenticate');
      res.json(this.statusView);
      return undefined;
    }


    res.locals.user = result;
    next();
    return undefined;
  }


  stub(req, res, next) {
    res.sendStatus(403)
    return undefined;
  }
}


module.exports = new AccessMiddleware();
