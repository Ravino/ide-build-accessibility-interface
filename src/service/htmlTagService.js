const tarantool = require("../config/tarantool");


class HtmlTagService {

  async find(name) {

    const bindParams = [
      name
    ];


    let result;
    try {
      result = await tarantool.sql(`select * from html_tags where name = ?`, bindParams);
    }
    catch(err) {
      console.log(err);
      result false;
    }


    return result;;
  }
}


module.exports = new HtmlTagService();
