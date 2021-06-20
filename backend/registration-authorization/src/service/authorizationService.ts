import { readFileSync, realpathSync } from 'fs';
import { Inject } from 'typescript-ioc';
import crypto from 'crypto';
import Tokenize from 'node-tokenize'
import jsonwebtoken, { Secret } from 'jsonwebtoken';
import { SessionService } from './sessionService';
import { AbstractRegistrationAuthorizationService } from './abstractRegistrationAuthorizationService';


export class AuthorizationService extends AbstractRegistrationAuthorizationService {

  private privateKey: Secret;
  private publicKey: Secret;
  private tokenize: Tokenize;


  public constructor(
    @Inject private readonly sessionService: SessionService
  ) {
    super();


    const privateKeyPath = realpathSync(`${__dirname}/../jwtRS256.key`);
    const publicKeyPath = realpathSync(`${__dirname}/../jwtRS256.key.pub`);


    this.privateKey = readFileSync(privateKeyPath, {encoding: "utf8"});
    this.publicKey = readFileSync(publicKeyPath, {encoding: "utf8"});


    this.tokenize = new Tokenize(this.privateKey);
  }


  public async generatorRefreshToken(payload?: any): Promise<string> {
    const result = this.tokenize.generate(payload || '');
    return result;
  }


  public async generatorAccessToken(payload?: any): Promise<string> {
    const result = await jsonwebtoken.sign(payload || {}, this.privateKey, { algorithm: 'RS256', expiresIn: 900});
    return result;
  }


  public async bindToken(refreshToken: string, accessToken: string): Promise<string> {
    const result = crypto.createHash('sha512').update(`${refreshToken}${accessToken}`).digest('hex');
    return result;
  }


  public async getPairToken(payload: any): Promise<any> {

    const refreshToken: string = await this.generatorRefreshToken();
    const accessToken = await this.generatorAccessToken(payload);


    const result = {
      refreshToken,
      accessToken
    };


    return result;
  }
}
