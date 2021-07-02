const {unlink} = require('fs');
const {promisify} = require('util');
const path = require('path');
const uniqId = require('uniqid');
const write = require('write');


const pUnlink = promisify(unlink);


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


  async genName(type) {
    if(type == 'random') {
      return uniqId();
    }


    if(type == 'time') {
      return String(new Date());
    }
  }


  async getPath(dst, name, ext) {
    const pathName = path.resolve(`./${dst}/${name}.${ext}`);
    return pathName;
  }


  async remove(pathName) {

    let result = true;
    try {
      await pUnlink(pathName);
    }
    catch(err) {
      console.log(err);
      result = false;
    }


    return result;
  }
}


module.exports.SaveFileService = SaveFileService;
