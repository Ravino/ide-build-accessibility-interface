module.exports.context = async (app) => {

  const user = app.res.locals.user;


  const result = {
    user
  };


  return result;
};
