const pa11y = require('pa11y');
const uuidV4 = require('uuid').v4;
const tarantool = require('../config/tarantool');
const {SaveFileService} = require('./saveFileService');


class ReportService {

  constructor() {
    this.saveFileService = new SaveFileService();
  }


  async count(userId) {

    const bindParams = [
      userId
    ];


    let result;
    try {
      result = await tarantool.sql(`select count(report_id) from reports where user_id = ?`, bindParams);
    }
    catch(err) {
      console.log(err);
      return false;
    }


    console.log(result);
    return result[0].COLUMN_1;
  }


  async getByUserReportId(userId, reportId) {

    const bindParams = [
      userId,
      reportId
    ];


    let result;
    try {
      result = await tarantool.sql(`select * from reports where user_id = ? and report_id = ?`, bindParams);
    }
    catch(err) {
      console.log(err);
      result = false;
    }


    return result[0];
  }


  async getListByUserReportId(userId, size, offset) {

    const bindParams = [
      userId,
      size,
      offset
    ];


    let result;
    try {
      result = await tarantool.sql(`select * from reports where user_id = ? order by report_id limit ? offset ?`, bindParams);
    }
    catch(err) {
      console.log(err);
      result = false;
    }


    return result;
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
