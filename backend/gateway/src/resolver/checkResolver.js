const escapeHtml = require('escape-html');
const trim = require('trim');

const DomService = require('../service/domService');
const AccessibilityService = require('../service/accessibilityService');

const StatusView = require('../view/statusView');


class CheckResolver {

  constructor() {
    this.domService = new DomService ();
    this.accessibilityService = new AccessibilityService();
    this.statusView = new StatusView();
  }


  async parse(str) {

    str = trim(str);


    const validate = await this.domService.validate(str);
    if(validate !== true) {
      this.statusView.addStatus('invalidSyntax');
      this.statusView.addDescription(validate);
      this.statusView.addData(null);
      return this.statusView;
    }


    const domTree = this.domService.parse(str);
    if(!domTree) {
      this.statusView.addStatus('notSuccess');
      this.addDescription('internal error build abstract syntax and document object model tree');
      this.statusView.addData(null);
      return this.statusView;
    }


    const treeToGraph = this.accessibilityService.treeToGraph(domTree);
    if(!treeToGraph) {
      this.statusView.addStatus('notSuccess');
      this.statusView.addDescription('Internal error in build dom tree to graph accessibility');
      this.statusView.addData(null);
      return this.statusView;
    }


    const graphString = this.accessibilityService.puckGraphString();
    if(!graphString) {
      this.statusView.addStatus('notSuccess');
      this.statusView.addDescription('Internal error puck cycle tree to graph string');
      this.statusView.addData(null);
      return this.statusView;
    }


    this.statusView.addStatus('success');
    this.statusView.addDescription('');
    this.statusView.addData(graphString);
    return this.statusView;
  }


  async done(req, res) {
    const result = await this.parse(req.body.html || '');
    res.json(result);
    return undefined;
  }
}


module.exports = new CheckResolver();