const pa11y = require('pa11y');
const uuidV4 = require('uuid').v4;
const tarantool = require('../config/tarantool');
const {SaveFileService} = require('./saveFileService');


class ReportService {

  constructor() {
    this.saveFileService = new SaveFileService();
  }


  async create(nameFile) {

    let result = false;
    try {
      result = await pa11y(`http://ide-serve-static/files/${nameFile}.html`, {
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


  async save(userId, report) {

    const ext = 'json';
    const currentDate = Date.now();
    const uuid = uuidV4();
    const reportStr = JSON.stringify(report);
    const nameFile = await this.saveFileService.genName('time');
    const pathFile = await this.saveFileService.getPath('reports', nameFile, ext);
    const urlFile = `/reports/${nameFile}.${ext}`;


    const bindParams = [
      userId,
      nameFile,
      pathFile,
      urlFile,
      reportStr,
      currentDate,
      currentDate,
      uuid
    ];


    let result = true;
    try {
      result = await tarantool.sql(`insert into reports (user_id, name, path, url, body, created_at, updated_at, uuid) values(?, ?, ?, ?, ?, ?, ?, ?)`, bindParams);
    }
    catch(err) {
      console.log(err);
      result = false;
    }


    result = await this.saveFileService.save(pathFile, reportStr);
    return result;
  }
}


module.exports.ReportService = new ReportService();
