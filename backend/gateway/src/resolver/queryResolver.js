const {RequestProfileResolver} = require('./requestProfileResolver');
const {RequestReportResolver} = require('./requestReportResolver');


class QueryResolver {
  constructor() {
    this.requestProfileResolver = RequestProfileResolver;
    this.requestReportResolver = RequestReportResolver;
  }
}


module.exports.QueryResolver = new QueryResolver();
