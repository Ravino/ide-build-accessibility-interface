const trim = require('trim');
const { confSetCookie } = require('../config/cookieParser');


const {JWTService} = require('../service/jwtService');
const StatusView = require('../view/statusView');


class AccessMiddleware {

  constructor() {
    this.jwtService = JWTService;
    this.statusView = new StatusView();
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


    res.locals.user = await this.decode(accessToken);
    next();
    return undefined;
  }


  async getData(req, res, next) {
    let accessToken = req.signedCookies[confSetCookie.nameCookie] || '';
    accessToken = trim(accessToken);
    res.locals.user = await this.decode(accessToken)
    next();
    return undefined;
  }


  async decode(accessToken) {

    const result = await this.jwtService.decode(accessToken);
    if(!result) {
      return undefined;
    }


    return result;
  }


  stub(req, res, next) {
    res.sendStatus(403)
    return undefined;
  }
}


module.exports = AccessMiddleware;
