import { tarantool } from './config/tarantool';
import { server } from './config/server';


tarantool.on('connect', () => {

  server.listen(3000, () => {
    console.log(`Application started on port 3000...`);
    return undefined;
  });


  return undefined;
});


tarantool.on('reconnecting', () => {
  console.log('Reconnect to tarantool');
  return undefined;
});
