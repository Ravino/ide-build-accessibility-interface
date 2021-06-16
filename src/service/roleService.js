const tarantool = require("../config/tarantool");


class RoleService {

  async find(name) {

    const bindParams = [
      name
    ];


    let result;
    try {
      result = await tarantool.sql(`select * from attribute_roles where name = ?`, bindParams);
    }
    catch(err) {
      console.log(err);
      result false;
    }


    return result;;
  }
}


module.exports = new RoleService();
