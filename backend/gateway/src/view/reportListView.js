class ReportListView {

  constructor (cursor, countFn, itemsFn) {
    this.cursor = cursor;
    this.countFn = countFn;
    this.itemsFn = itemsFn;
  }


  async count() {
    return await this.countFn();
  }


  async items() {
    return await this.itemsFn ();
  }
}


module.exports.ReportListView = ReportListView;
