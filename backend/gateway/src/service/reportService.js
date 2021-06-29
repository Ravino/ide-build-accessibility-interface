const pa11y = require('pa11y');
const tarantool = require('../config/tarantool');


class ReportService {

  async create(pathFile) {

    let result = false;
    try {
      result = await pa11y(pathFile, {
        chromeLaunchConfig: {
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        }
      });
    }
    catch(err) {
      console.log(err);
      result = false;
    }


    return result;
  }


  async save(report) {}
}


module.exports.ReportService = new ReportService();
