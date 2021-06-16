class StatusView {

  constructor() {
    this.status = '';
    this.description = '';
    this.data = null
  }


  addStatus(status) {
    this.status = status;
    return undefined;
  }


  addData(data) {
    this.data = data;
    return undefined;
  }
}


module.exports = StatusView;
