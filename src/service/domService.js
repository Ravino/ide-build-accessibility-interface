const htmlValidator = require('html-validator');
const htmlDomParser = require('html-dom-parser');


class DomService {

  async validate(str) {

    const config = {
      format: 'text',
      data: str
    };


    let result = null;
    try {
      result = await htmlValidator(config);
    }
    catch(err) {
      result = err;
    }


    console.log(result);
    return result;
  }


  parse(str) {
    return htmlDomParser(str);
  }
}


module.exports = new DomService();
