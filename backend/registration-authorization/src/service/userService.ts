import { tarantool } from '../config/tarantool';
import { v4 as uuidV4 } from 'uuid';


export class UserService {

  public async getByNameField(nameField: string, selector: string|number): Promise<any> {

    const params = [
      selector
    ];


    let usersList: any[] = [];
    try {
      usersList = await tarantool.sql(`select * from users where ${ nameField } = ?`, params);
    }
    catch(err) {
      console.log(err);
    }


    let user: any = usersList[0];
    return user;
  }


  public async create(firstname: string, lastname: string, password: string, confirmed: boolean, email?: string|null, vkontakteProfileId?: number|null): Promise<any> {

    const currentAt: number = Date.now();
    const uuid: string = uuidV4();
    const displayName = `${ firstname } ${ lastname }`;
    const scope: string = 'user';


    const params = [
      email,
      firstname,
      lastname,
      displayName,
      currentAt,
      currentAt,
      password,
      uuid,
      confirmed,
      vkontakteProfileId,
      scope
    ];


    let result: any = null;
    try {
      result = await tarantool.sql('insert into users (email, firstname, lastname, display_name, created_at, updated_at, password, uuid, confirmed, vkontakte_profile_id, scope) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', params);
    }
    catch(err) {
      console.log(err);
//      throw err;
    }


    console.log(result);
    return result;
  }


  public async updateByNameField(nameField: string, selector: string|number, key: string, value: string|number|boolean): Promise<any> {

    const bindParams: any[] = [
      value,
      selector
    ];


    let result: any;
    try {
      result = await tarantool.sql(`update users set ${key} = ? where ${nameField} = ?`, bindParams);
    }
    catch(err) {
      console.log(err);
        return false;
    }


    return true;
  }
}
