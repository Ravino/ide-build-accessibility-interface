const AccessMiddleware = require('../middleware/accessMiddleware');
const checkResolver = require('../resolver/checkResolver');


class CheckRouter {

  middleware(req, res, next) {
    const accessMiddleware = new AccessMiddleware();
    accessMiddleware.getData(req, res, next);
    return undefined;
  }


  handler(req, res) {
    checkResolver.done(req, res);
    return undefined;
  }
}


module.exports = new CheckRouter;
