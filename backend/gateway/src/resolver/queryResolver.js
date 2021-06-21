const {RequestProfileResolver} = require('./requestProfileResolver');


class QueryResolver {
  constructor() {
    this.requestProfileResolver = RequestProfileResolver;
  }
}


module.exports.QueryResolver = new QueryResolver();
