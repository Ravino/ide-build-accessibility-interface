const escapeHtml = require('escape-html');
const trim = require('trim');

const domService = require('../service/domService');

const StatusView = require('../view/statusView');


class CheckResolver {

  constructor() {
    this.domService = domService;
    this.statusView = new StatusView();
  }


  async parse(str) {

    str = trim(str);


    const validate = await this.domService.validate(str);
    if(validate) {
      this.statusView.addStatus('invalidSyntax');
      this.statusView.addData(validate);
      return this.statusView;
    }


    const domTree = this.domService.parse(str);
    console.log(domTree);
    return domTree;
  }


  async done(req, res) {
    const result = await this.parse(req.body.html);
    res.json(result);
    return undefined;
  }
}


module.exports = new CheckResolver();
