const checkResolver = require('../resolver/checkResolver');


class CheckRouter {

  handler(req, res) {
    checkResolver.done(req, res);
    return undefined;
  }
}


module.exports = new CheckRouter;
