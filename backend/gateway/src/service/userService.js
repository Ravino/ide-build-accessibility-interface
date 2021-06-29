const tarantool = require('../config/tarantool');
const uuidV4 = require('uuid').v4;


class UserService {

  async getByNameField(nameField, selector) {

    const params = [
      selector
    ];


    let usersList = [];
    try {
      usersList = await tarantool.sql(`select * from users where ${ nameField } = ?`, params);
    }
    catch(err) {
      console.log(err);
    }


    let user = usersList[0];
    return user;
  }


  async create(firstname, lastname, password, confirmed, email, vkontakteProfileId) {

    const currentAt = Date.now();
    const uuid = uuidV4();
    const displayName = `${ firstname } ${ lastname }`;
    const scope = 'user';


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


    let result = null;
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


  async updateByNameField(nameField, selector, key, value) {

    const bindParams = [
      value,
      selector
    ];


    let result;
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


module.exports = new UserService();
