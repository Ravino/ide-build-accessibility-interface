const server = require("express")();
const corsInitialization = require('./cors');
const bodyParserInitialization = require("./bodyParser");
const routerInitialization = require("./router");


module.exports = server;


corsInitialization(server);
bodyParserInitialization(server);
routerInitialization(server);
