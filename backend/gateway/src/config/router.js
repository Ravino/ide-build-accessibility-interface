const {Router} = require("express");

const checkRouter = require("../router/checkRouter");
const supportRouter = require('../router/supportRouter');
const graphqlRouter = require('../router/graphqlRouter');
const otherRouter = require("../router/otherRouter");


const router = Router();


router.use("/check",
  checkRouter.middleware,
  checkRouter.handler
);

router.use("/support",
  supportRouter.handler
);

router.use('/graphql',
  graphqlRouter.middleware,
  graphqlRouter.handler
);

/*
router.use("/*",
  otherRouter.handler
);
*/


module.exports = function(server) {
  server.use(router);
  return undefined;
}
