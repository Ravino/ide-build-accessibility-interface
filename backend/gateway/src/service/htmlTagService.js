const tarantool = require("../config/tarantool");


class HtmlTagService {

  async getByNameField(field, value) {

    const bindParams = [
      value
    ];


    let result;
    try {
      result = await tarantool.sql(`select * from html_tags where ${field} = ?`, bindParams);
    }
    catch(err) {
      console.log(err);
      result = false;
    }


    return result[0];
  }
}


module.exports = new HtmlTagService();
