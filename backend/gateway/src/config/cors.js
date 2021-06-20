const cors = require('cors');

const conf = {
  credentials: true,
  origin: global.process.env.CORS_ORIGIN || '*'
};


module.exports = function(server) {
  server.use(cors(conf));
  return undefined;
}
