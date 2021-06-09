const server = require("express")();
const bodyParserInitialization = require("./bodyParser");
const routerInitialization = require("./router");


module.exports = server;


bodyParserInitialization(server);
routerInitialization(server);
