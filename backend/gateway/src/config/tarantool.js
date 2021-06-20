const TarantoolDriver = require("tarantool-driver");

const config = {
  port: Number(global.process.env.TARANTOOL_PORT),
  host: global.process.env.TARANTOOL_HOST,
  options: {
    username: global.process.env.TARANTOOL_USER_NAME,
    password: global.process.env.TARANTOOL_USER_PASSWORD,
    lazyConnect: true
  }
};


const tarantool = new TarantoolDriver(config);


module.exports = tarantool;
