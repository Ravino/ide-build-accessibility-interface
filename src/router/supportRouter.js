const supportResolver = require('../resolver/supportResolver');


class SupportRouter {

  handler(req, res) {
    supportResolver.done(req, res);
    return undefined;
  }
}


module.exports = new SupportRouter();
