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


  addDescription(description) {
    this.description = description;
  }


  addData(data) {
    this.data = data;
    return undefined;
  }
}


module.exports = StatusView;
