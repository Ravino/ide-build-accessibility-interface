class OtherRouter {

  handler(req, res) {
    res.sendStatus(403);
    return undefined;
  }
}



const otherRouter = new OtherRouter();


module.exports = otherRouter;
