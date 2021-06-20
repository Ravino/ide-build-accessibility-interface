import  Redis from 'ioredis';


const config = {
  port: <number>Number(global.process.env.IOREDIS_PORT),
  host: <string>global.process.env.IOREDIS_HOST
};


export let redis = new Redis(config)
