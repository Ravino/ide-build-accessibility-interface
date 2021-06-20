import { Singleton } from 'typescript-ioc';
import {render as pugRender} from 'pug';
import {tarantool} from '../config/tarantool';
import { createTransport } from 'nodemailer';


@Singleton
export class MailerService {

  private mailerLanguageDefault: string = '';
  private account?: any;
  private transfer?: any;
  private mailer?: any;


  public constructor(){}


  private async get(name: string, language: string): Promise<any> {

    const languageDefault: string = this.mailerLanguageDefault;


    const bindParams: any[] = [
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


  private async initialization(): Promise<any> {

    this.mailer = {};
this.mailerLanguageDefault = <string>global.process.env.MAILER_LANGUAGE_DEFAULT || '';
    this.account = {};
    this.mailer.smtpAddress = <string>global.process.env.MAILER_SMTP_ADDRESS || '';
    this.mailer.smtpPort = <string>global.process.env.MAILER_SMTP_PORT || 465;
    this.account.user = <string>global.process.env.MAILER_EMAIL_ADDRESS || '';
    this.account.pass = <string>global.process.env.MAILER_EMAIL_PASSWORD || '';


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


  private async generatorMessage(typeTemplate: string, password: string, verificationToken: string, language: string): Promise<any> {

    const args: any = {
      password,
      verificationToken
    };


    const template = await this.get(typeTemplate, language);
    const html: string = pugRender(template.BODY, args);


    const message = {
      from: this.account.user,
      subject: template.SUBJECT,
      html: html
    };


    return message;
  }


  private async senderMessage(message: any): Promise<any> {

    let info: any;
    try {
      info = await this.transfer.sendMail(message);
    }
    catch(err) {
      console.log(err);
    }

    console.log(info);
    return undefined;
  }


  public async sender(typeTemplate: string, toEmail: string, password: string, verificationToken: string, language: string): Promise<any> {

    if(!this.account) {
      await this.initialization();
    }


    const message: any = await this.generatorMessage(typeTemplate, password, verificationToken, language);
    message.to = toEmail;


    try {
      await this.senderMessage(message);
    }
    catch(err) {
      console.log(err);
    }


    return undefined;
  }
}
