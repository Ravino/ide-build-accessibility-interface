const cors = require('cors');

const conf = {
  credentials: true,
  origin: String(global.process.env.CORS_ORIGIN).split('|')
};


module.exports = function(server) {
  server.use(cors(conf));
  return undefined;
}
