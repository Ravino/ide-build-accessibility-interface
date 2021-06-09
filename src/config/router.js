const {Router} = require("express");
const checkRouter = require("../router/checkRouter");
const otherRouter = require("../router/otherRouter");


const router = Router();


router.use("/check",
  checkRouter.handler
);


router.use("/*",
  otherRouter.handler
);


module.exports = function(server) {
  server.use(router);
  return undefined;
}
