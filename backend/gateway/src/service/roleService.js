const uuidV4 = require('uuid').v4;
const tarantool = require("../config/tarantool");


class RoleService {

  async getByNameField(field, value) {

    const bindParams = [
      value
    ];


    let result;
    try {
      result = await tarantool.sql(`select * from attribute_roles where ${field} = ?`, bindParams);
    }
    catch(err) {
      console.log(err);
      result = false;
    }


    return result;;
  }


  async add(name) {

    const currentDate = Date.now();
    const uuid = uuidV4();


    const bindParams = [
      name,
      currentDate,
      currentDate,
      uuid
    ];


    let result = true;
    try {
      result = await tarantool.sql(`insert into attribute_roles (name, created_at, updated_at, uuid) values(?, ?, ?, ?)`, bindParams);
    }
    catch(err) {
      console.log(err);
      result = false;
    }


    return result;
  }
}


module.exports = new RoleService();
