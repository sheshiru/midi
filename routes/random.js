const express = require("express");
const router = new express.Router();
const Restaurant = require("../models/Restaurant");
const distance = require("google-distance-matrix");
const getDistance = require("./google_distance");
const comp = require("../models/Company");
const guardRoute = require("./../utils/guard-route");

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

//wtf
router.get("/random", guardRoute, (req, res) => {
  Restaurant.find()
    .then(dbRes => {
      // console.log("ici", dbRes);
      const randomIndex = Math.floor(Math.random() * dbRes.length);
      console.log(dbRes[randomIndex].address);
      comp
        .findOne({ _id: "5d1b7109f37ffc1d8fe36211" })
        .then(company => {
          let speed;
          console.log(company);
          getDistance(
            [dbRes[randomIndex].address],
            [company.address],
            distance => {
              let bigWrapper = "wrapper-pages";
              if (
                dbRes[randomIndex].speed.quick >=
                  dbRes[randomIndex].speed.slow &&
                dbRes[randomIndex].speed.quick >=
                  dbRes[randomIndex].speed.medium
              ) {
                speed = "fast";
              }
              if (
                dbRes[randomIndex].speed.slow >=
                  dbRes[randomIndex].speed.quick &&
                dbRes[randomIndex].speed.slow >= dbRes[randomIndex].speed.medium
              ) {
                speed = "slow";
              }
              if (
                dbRes[randomIndex].speed.medium >=
                  dbRes[randomIndex].speed.slow &&
                dbRes[randomIndex].speed.medium >=
                  dbRes[randomIndex].speed.quick
              ) {
                speed = "normal";
              }
              if (
                dbRes[randomIndex].speed.medium ==
                  dbRes[randomIndex].speed.quick &&
                dbRes[randomIndex].speed.medium == dbRes[randomIndex].speed.slow
              ) {
                speed = "normal";
              }
              res.render("random-restaurant", {
                dbRes: dbRes[randomIndex],
                distance,
                speed,
                navlayout: true,
                bigWrapper
              });
            }
          );
        })
        .catch(companyErr => {
          console.log(companyErr);
        });
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
