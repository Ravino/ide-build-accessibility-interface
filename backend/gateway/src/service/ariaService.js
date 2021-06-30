const tarantool = require("../config/tarantool");


class AriaService {

  async getByNameField(field, value) {

    const bindParams = [
      value
    ];


    let result;
    try {
      result = await tarantool.sql(`select * from attribute_arias where ${field} = ?`, bindParams);
    }
    catch(err) {
      console.log(err);
      result = false;
    }


    return result;;
  }
}


module.exports = new AriaService();
