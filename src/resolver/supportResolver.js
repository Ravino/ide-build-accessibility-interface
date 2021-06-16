const escapeHtml = require('escape-html');
const trim = require('trim');

const mailerService = require('../service/mailerService');

const StatusView = require('../view/statusView');


class SupportResolver {

  constructor() {
    this.mailerService = mailerService;
    this.statusView = new StatusView();
  }


  async registerAppeal(email, subject, body) {

    email = escapeHtml(email);
    email = trim(email);

    subject = escapeHtml(subject);
    subject = trim(subject);

    body = escapeHtml(body);
    body = trim(body);


    const emailValidate = this.mailerService.emailValidator(email);
    if(!emailValidate) {
      this.statusView.addStatus('invalidEmail');
      this.statusView.addDescription('Incorrect email. Please check your email address and repeat input');
      return this.statusView;
    }


    const subjectValidate = this.mailerService.subjectValidator(subject);
    if(!subjectValidate) {
      this.statusView.addStatus('invalidAppeal');
      this.statusView.addDescription('Incorrect subject of appeal. Subject must have the following text');
      return this.statusView;
    }


    const bodyValidate = this.mailerService.bodyValidator(body);
    if(!bodyValidate) {
      this.statusView.addStatus('invalidAppeal');
      this.statusView.addDescription('Incorrect body of appeal. Body must have the following text');
      return this.statusView;
    }


    const saveMessage = await this.mailerService.saveMessage(email, subject, body);
    if(!saveMessage) {
      this.statusView.addStatus('notSuccess');
      this.statusView.addDescription('Internal error in register your appeal for me');
      return this.statusView;
    } 


    this.statusView.addStatus('success');
    this.statusView.addDescription('');
    return this.statusView;
  }


  async done(req, res) {
    const result = await this.registerAppeal(req.body.email || '', req.body.subject || '', req.body.body || '');
    res.json(result);
    return undefined;
  }
}


module.exports = new SupportResolver();
