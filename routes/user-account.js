const express = require("express");
const router = new express.Router();
const User = require("../models/User");
const guardRoute = require("./../utils/guard-route");

router.get("/user-account/:id", (req, res) => {
  let bigWrapper = "wrapper-pages";
  User.findById(req.params.id)
    .populate("favorites")
    .then(users => {
      res.render("user/user-account", { users, bigWrapper, navlayout: true });
    })
    .catch(err => console.error(err));
});

module.exports = router;
