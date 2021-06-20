import { Container } from 'typescript-ioc';
import { Request } from 'express';
import { tarantool } from '../config/tarantool';
import { v4 as uuidV4 } from 'uuid';
import {AuthorizationService } from './authorizationService';


export class SessionService {

  public async getByNameField(nameField: string, selector: string|number): Promise<any> {

    const params = [
      selector
    ];


    let sessionsList: any[] = [];
    try {
      sessionsList = await tarantool.sql(`select * from sessions where ${ nameField } = ?`, params);
    }
    catch(err) {
      console.log(err);
    }


    return sessionsList[0];
  }


  public async deleteByNameField(nameField: string, selector: string|number): Promise<any> {

    const params = [
      selector
    ];


    let result: any;
    try {
      result = await tarantool.sql(`delete from sessions where ${ nameField } = ?`, params);
    }
    catch(err) {
      console.log(err);
      return undefined;
    }


    return true;
  }


  public async save(userId: number, bindToken: string, ipAddress: string, country: string, region: string, city: string, userAgent: string, scope: string): Promise<any> {

    const currentAt: number = Date.now();
    const uuid: string = uuidV4();


    const params = [
      userId,
      bindToken,
      ipAddress,
      country,
      region,
      city,
      userAgent,
      scope,
      currentAt,
      currentAt,
      uuid
    ];


    let result: any = null;
    try {
      result = await tarantool.sql('insert into sessions (user_id, bind_token, ip_address, country, region, city, user_agent, scope, created_at, updated_at, uuid) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', params);
    }
    catch(err) {
      console.log(err);
      return undefined;
    }


    return result;
  }


  public async create(req: Request, payload: any): Promise<boolean> {

    const ipAddress: string = req.ip || '';
    const userAgent: string = req.get('User-Agent') || '';
    const country: string = req.ipInfo.country || '';
    const region: string = req.ipInfo.region || '';
    const city: string = req.ipInfo.city || '';
    const userId: number = payload.user.USER_ID;
    const scope: string = payload.user.SCOPE || '';
    const accessToken: string = payload.pairToken.accessToken || '';
    const refreshToken: string = payload.pairToken.refreshToken || '';


    let bindToken: string;
    try {
      bindToken = await Container.get(AuthorizationService).bindToken(refreshToken, accessToken);
    }
    catch(err) {
      console.log(err);
      return false;
    }


    let result: any;
    try {
      result = await this.save(userId, bindToken, ipAddress, country, region, city, userAgent, scope);
    }
    catch(err) {
      console.log(err);
      return false;
    }


    return true;
  }


  public async update(sessionId: number, scope: string, currentBindToken: string, bindToken: string): Promise<any> {

    const currentAt: number = Date.now();


    const bindParams: any[] = [
      bindToken,
      currentAt,
      scope,
      sessionId,
      currentBindToken
    ];


    let result: any;
    try {
      result = await tarantool.sql('update sessions set bind_token = ?, updated_at = ?, scope = ? where session_id = ? and bind_token = ?', bindParams);
    }
    catch(err) {
      console.log(err);
        return false;
    }


    return true;
  }
}
