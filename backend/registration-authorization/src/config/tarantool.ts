import TarantoolDriver from 'tarantool-driver';


const config = {
  port: <number>Number(global.process.env.TARANTOOL_PORT),
  host: <string>global.process.env.TARANTOOL_HOST,
  options: {
    username: <string>global.process.env.TARANTOOL_USER_NAME,
    password: <string>global.process.env.TARANTOOL_USER_PASSWORD,
    lazyConnect: true
  }
};


export const tarantool: TarantoolDriver = new TarantoolDriver(config)
