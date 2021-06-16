const tarantool = require("../config/tarantool");


class RoleService {

  async find(name) {

    let result;
    try {
      result = await tarantool.sql(`select role_id from roles where name = ?`, bindParams);
    }
    catch(err) {
      console.log(err);
      return false;
    }


    return true;
  }
}


const roleService = new RoleService()
module.exports = roleService;
