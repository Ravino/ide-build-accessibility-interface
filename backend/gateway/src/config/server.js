const server = require("express")();
const corsInitialization = require('./cors');
const {cookieParserInitialization} = require('./cookieParser');
const bodyParserInitialization = require("./bodyParser");
const {apolloGatewayInitialization} = require('./apolloGateway');
const routerInitialization = require("./router");


module.exports = server;


corsInitialization(server);
cookieParserInitialization(server);
bodyParserInitialization(server);
apolloGatewayInitialization(server);
routerInitialization(server);
