function guardRoute(req, res, next) {
  if (!Boolean(req.session.currentUser)) {
    res.redirect("/login");
  } else next();
}

module.exports = guardRoute;
