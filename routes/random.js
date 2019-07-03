const express = require("express");
const router = new express.Router();
const Restaurant = require("../models/Restaurant");

// function getRandom() {
//   Restaurant.count().exec(function(err, count) {
//     var random = Math.floor(Math.random() * count);
//     res = Restaurant.findOne()
//       .skip(random)
//       .exec(function(err, result) {});
//   });
// }

// getRandom();

router.get("/random", (req, res) => {
  Restaurant.find()
    .then(dbRes => {
      var randomIndex = Math.floor(Math.random() * dbRes.length);
      res.render("restaurant-details", {
        resto: dbRes[randomIndex],
        navlayout: true
      });
    })
    .catch(dbErr => console.log(dbErr));
});

module.exports = router;
