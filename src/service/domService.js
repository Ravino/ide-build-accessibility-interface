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


    if('The document validates according to the specified schema(s).\n' == result) {
      result = true;
    }


    return result;
  }


  parse(str) {

    let domTree= {};
    try {
      domTree = htmlDomParser(str);
    }
    catch(err) {
      console.log(err);
      return false;
    }


    return domTree;
  }
}


module.exports = DomService;
