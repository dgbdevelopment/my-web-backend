const helpers = {};

helpers.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error_msg", "No tienes acceso");
  res.redirect("/");
};

module.exports = helpers;
