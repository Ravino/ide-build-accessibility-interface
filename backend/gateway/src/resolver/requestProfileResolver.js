const userService = require('../service/userService');
const {mergeAsync} = require('../mapping/mapping.js');
const {profileEntityToProfileView} = require('../mapping/profileMapping');


class RequestProfileResolver {

  constructor() {
    this.userService = userService;
  }


  async get(id) {
    const userAsync = this.userService.getByNameField('user_id', id);
    return await mergeAsync(userAsync, profileEntityToProfileView);
  }
}


module.exports.RequestProfileResolver = new RequestProfileResolver();
