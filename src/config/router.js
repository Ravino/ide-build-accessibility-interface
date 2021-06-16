const {Router} = require("express");

const checkRouter = require("../router/checkRouter");
const supportRouter = require('../router/supportRouter');
const otherRouter = require("../router/otherRouter");


const router = Router();


router.use("/check",
  checkRouter.handler
);

router.use("/support",
  supportRouter.handler
);

router.use("/*",
  otherRouter.handler
);


module.exports = function(server) {
  server.use(router);
  return undefined;
}
