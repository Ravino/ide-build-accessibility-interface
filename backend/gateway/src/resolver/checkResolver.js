const escapeHtml = require('escape-html');
const trim = require('trim');

const DomService = require('../service/domService');
const AccessibilityService = require('../service/accessibilityService');
const {SaveFileService} = require('../service/saveFileService');
const {ReportService} = require('../service/reportService');
const StatusView = require('../view/statusView');


class CheckResolver {

  constructor() {
    this.domService = new DomService ();
    this.accessibilityService = new AccessibilityService();
    this.saveFileService = new SaveFileService();
    this.reportService = ReportService;
    this.statusView = new StatusView();
  }


  async report(str, user) {

    const nameFile = await this.saveFileService.genName('random');
    if(!nameFile) {
      console.log('Report not create');
      return undefined;
    }


    const pathFile = await this.saveFileService.getPath('files', nameFile, 'html');
    if(!pathFile) {
      console.log('Report not create');
      return undefined;
    }


    const statusSave = await this.saveFileService.save(pathFile, str);
    if(!statusSave) {
      console.log('Report not create');
      return undefined;
    }


    const statusCreateReport = await this.reportService.create(nameFile);
    if(!statusCreateReport) {
      console.log('Report not create');
      this.saveFileService.remove(pathFile);
      return undefined;
    }


    this.saveFileService.remove(pathFile);
    const statusSaveReport = await this.reportService.save(user.USER_ID, statusCreateReport);
    if(!statusSaveReport) {
      console.log('Report not created');
      return undefined;
    }


    return undefined;
  }


  async parse(str, user) {

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


    await this.accessibilityService.check();


    const graphString = this.accessibilityService.puckGraphString();
    if(!graphString) {
      this.statusView.addStatus('notSuccess');
      this.statusView.addDescription('Internal error puck cycle tree to graph string');
      this.statusView.addData(null);
      return this.statusView;
    }


    if(user) {
      this.report(str, user);
    }


    this.statusView.addStatus('success');
    this.statusView.addDescription('');
    this.statusView.addData(graphString);
    return this.statusView;
  }


  async done(req, res) {
    const result = await this.parse(req.body.html || '', res.locals.user);
    res.json(result);
    return undefined;
  }
}


module.exports = new CheckResolver();
