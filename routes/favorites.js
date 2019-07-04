const express = require("express");
const router = new express.Router();
const User = require("../models/User");

router.post("/addToFav", (req, res) => {
  let userId = req.session.currentUser._id;

  console.log(userId);
  console.log(req.body);

  User.findByIdAndUpdate(userId, { $push: { favorites: friend } })
    .then(favorite => res.send(favorite))
    .catch(err => console.log(err));
});

module.exports = router;
