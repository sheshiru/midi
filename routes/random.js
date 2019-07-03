const express = require("express");
const router = new express.Router();
const Restaurant = require("../models/Restaurant");
const distance = require("google-distance-matrix");
const getDistance = require("./google_distance");
const comp = require("../models/Company");

// function getRandom() {
//   Restaurant.count().exec(function(err, count) {
//     var random = Math.floor(Math.random() * count);
//     Restaurant.findOne()
//       .skip(random)
//       .exec(function(err, result) {
//         console.log(result);
//       });
//   });
// }

// getRandom();

router.get("/random", (req, res) => {
  Restaurant.find()

    .then(dbRes => {
      const company = comp.findById(req.query.companyId);
      var randomIndex = Math.floor(Math.random() * dbRes.length);
      var distanceRandom = getDistance(
        [dbRes[randomIndex].address],
        [dbRes[randomIndex].address],
        distance => {
          console.log(dbRes[randomIndex].address);
          console.log(company.address);
          res.render("random-restaurant", {
            dbRes: dbRes[randomIndex],
            distanceRandom,
            navlayout: true
          });
        }
      );
    })
    .catch(dbErr => console.log(dbErr));
});

// function getDistance(origins, destination, clbk) {
//   distance.matrix(origins, destination, function(err, distances) {
//     if (!err) {
//       clbk(distances.rows[0].elements[0].distance.text);
//     }
//   });
// }

// router.get("/random", async (req, res) => {
//   try {
//     const resto = await Restaurant.find();
//     const company = await comp.findById(req.query.companyId);

//     var randomIndex = Math.floor(Math.random() * dbRes.length);
//     getDistance([resto.address], [company.address], distance => {
//       let likesCount = resto.favorites.length;

//       res.render("restaurant-details", {
//         likesCount,
//         resto: resto[randomIndex],
//         company,
//         distance,
//         navlayout: true
//       });
//     });
//   } catch (err) {
//     console.log(err);
//   }
// });

module.exports = router;
