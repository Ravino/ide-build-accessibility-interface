"use strict";


const tarantool = require("./config/tarantool");
const server = require("./config/server");


tarantool.on("connect", () => {

  server.listen(3000, () =>{
    console.log("Start of application on port 3000");
    return undefined;
  });


  return undefined;
});


tarantool.on('reconnecting', () => {
  console.log('Reconnect to tarantool');
  return undefined;
});
