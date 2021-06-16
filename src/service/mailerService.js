const emailValidate = require('email-validator').validate;
const pugRender = require('pug').render;
const createTransport = require('nodemailer').createTransport;
const uuidV4 = require('uuid').v4;

const tarantool = require('../config/tarantool');


class MailerService {

  constructor() {
    this.mailerLanguageDefault = '';
    this.account;
    this.transfer;
    this.mailer;
  }


  async get(name, language) {

    const languageDefault = this.mailerLanguageDefault;


    const bindParams = [
      name,
      language,
      languageDefault
    ];


    let list;
    try {
      list = await tarantool.sql(`select * from mail_templates where name=? and (language=? OR language=?)`, bindParams);
    }
    catch(err) {
      console.log(err);
      return undefined;
    }


    return list[0] || undefined;
  }


  async initialization() {

    this.mailer = {};
this.mailerLanguageDefault = global.process.env.MAILER_LANGUAGE_DEFAULT || '';
    this.account = {};
    this.mailer.smtpAddress = global.process.env.MAILER_SMTP_ADDRESS || '';
    this.mailer.smtpPort = global.process.env.MAILER_SMTP_PORT || 465;
    this.account.user = global.process.env.MAILER_EMAIL_ADDRESS || '';
    this.account.pass = global.process.env.MAILER_EMAIL_PASSWORD || '';


    this.transfer = createTransport({
      host: this.mailer.smtpAddress,
      port: this.mailer.smtpPort,
      secure: true,
      auth: {
        user: this.account.user,
        pass: this.account.pass
      }
    });


    return undefined;
  }


  async generatorMessage(typeTemplate, password, verificationToken, language) {

    const args = {
      password,
      verificationToken
    };


    const template = await this.get(typeTemplate, language);
    const html = pugRender(template.BODY, args);


    const message = {
      from: this.account.user,
      subject: template.SUBJECT,
      html: html
    };


    return message;
  }


  async senderMessage(message) {

    let info;
    try {
      info = await this.transfer.sendMail(message);
    }
    catch(err) {
      console.log(err);
    }

    console.log(info);
    return undefined;
  }


  async sender(typeTemplate, toEmail, password, verificationToken, language) {

    if(!this.account) {
      await this.initialization();
    }


    const message = await this.generatorMessage(typeTemplate, password, verificationToken, language);
    message.to = toEmail;


    try {
      await this.senderMessage(message);
    }
    catch(err) {
      console.log(err);
    }


    return undefined;
  }


  emailValidator(email) {
    const result = emailValidate(email);
    return result;
  }


  async saveMessage(email, subject, body) {

    const currentDate = Date.now();
    const readed = false;
    const answered = false;
    const uuid = uuidV4();


    const bindParams = [
      email,
      subject,
      body,
      currentDate,
      currentDate,
      readed,
      answered,
      uuid
    ];


    let result = false;
    try {
      result = await tarantool.sql(`insert into mail_appeals (email, subject, body, created_at, updated_at, readed, answered, uuid) values(?, ?, ?, ?, ?, ?, ?, ?)`, bindParams);
    }
    catch(err) {
      console.log(err);
    }


    return result;
  }


  subjectValidator(subject) {
    const result = subject || false;
    return result;
  }


  bodyValidator(body) {
    const result = body || false;
    return result;
  }
}


module.exports = new MailerService();
