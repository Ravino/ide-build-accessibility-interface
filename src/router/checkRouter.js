const checkResolver = require('../resolver/checkResolver');


class CheckRouter {

  handler(req, res) {
    res.send("check");
    return undefined;
  }
}


module.exports = new CheckRouter;
