const {unlink} = require('fs');
const path = require('path');
const uniqId = require('uniqid');
const write = require('write');


class SaveFileService {

  async save(pathName, body) {

    let result = true;
    try {
      await write(pathName, body);
    }
    catch(err) {
      console.log(err);
      result = false;
    }


    return result;
  }


  async genName() {
    const name = uniqId();
    return name;
  }


  async getPath(name) {
    const pathName = path.resolve(`./files/${ name }.html`);
    return pathName;
  }


  async remove(pathName) {

    let result = true;
    try {
      await unlink(pathName);
    }
    catch(err) {
      console.log(err);
      result = false;
    }


    return result;
  }
}


module.exports.SaveFileService = SaveFileService;
