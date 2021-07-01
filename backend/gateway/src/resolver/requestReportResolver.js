const {decode, encode} = require('js-base64');
const {mergeAsync, mergeListAsync} = require('../mapping/mapping');
const {reportEntityToReportView} = require('../mapping/reportMapping');
const {ReportService} = require('../service/reportService');
const {ReportListView} = require('../view/reportListView');


class RequestReportResolver {

  constructor() {
    this.reportService = ReportService;
  }


  async get(userId, reportId) {
    const report = this.reportService.getByUserReportId(userId, reportId);
    return await mergeAsync(report, reportEntityToReportView);
  }


  async getList(userId, size) {
    return await this.createReportList(userId, size, 0);
  }


    async select(userId, cursor, offset) {
      const request = JSON.parse(decode(cursor));
      return await this.createReportList(userId, request.size, offset);
    }


  async createCursor(size) {

    const cursorObj = {
      size: size
    };

    const cursorStr = JSON.stringify(cursorObj);
    const cursor = encode(cursorStr);

    return cursor;
  }


  async createReportList(userId, size = 20, offset) {

    const cursor = await this.createCursor(size);
    const count = () => this.reportService.count(userId);
    const items = () => {
      const result = this.reportService.getListByUserReportId(userId, size, offset);
      return mergeListAsync(result, reportEntityToReportView);
    };


    const reportListView = new ReportListView(
      cursor,
      count,
      items
    );


    return reportListView;
  }
}


module.exports.RequestReportResolver = new RequestReportResolver();
