const express = require("express");
const router = new express.Router();
const User = require("../models/User");

router.post("/addToFav/:id", (req, res) => {
  let currentUser = req.session.currentUser;
  let userId = req.session.currentUser._id;
  const favId = req.params.id;

  User.findById(userId)
    .then(user => {
      if (user.favorites.includes(favId)) {
        User.findByIdAndUpdate(userId, { $pull: { favorites: favId } })
          .then(favorite => {
            const favIdIndex = currentUser.favorites.indexOf(favId);
            currentUser.favorites.splice(favIdIndex, 1);
            res.send(favorite);
          })
          .catch(err => console.log(err));
      } else {
        User.findByIdAndUpdate(userId, { $push: { favorites: favId } })
          .then(favorite => {
            currentUser.favorites.push(favId);
            res.send(favorite);
          })
          .catch(err => console.log(err));
      }
      console.log(user);
    })
    .catch(err => console.log(err));
});

module.exports = router;
