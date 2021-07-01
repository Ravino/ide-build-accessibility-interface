const AccessMiddleware = require('../middleware/accessMiddleware');


class GraphqlRouter {

  middleware(req, res, next) {
    const accessMiddleware = new AccessMiddleware();
    accessMiddleware.checkExistSession(req, res, next);
    return undefined;
  }


  handler(req, res) {
    return (req, res) => {};
  }
}


module.exports = new GraphqlRouter;
