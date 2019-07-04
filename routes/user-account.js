const express = require("express");
const router = new express.Router();
const User = require("../models/User");

router.get("/user-account", (req, res) => {
  let bigWrapper = "wrapper-user-account";
  User.find()
    .then(users => {
      res.render("user/user-account", { bigWrapper, navlayout: true });
    })
    .catch(err => console.error(err));
});

module.exports = router;
