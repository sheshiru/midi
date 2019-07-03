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

//wtf
router.get("/random", (req, res) => {
  Restaurant.find()
    .then(dbRes => {
      // console.log("ici", dbRes);
      const randomIndex = Math.floor(Math.random() * dbRes.length);
      console.log(dbRes[randomIndex].address);
      comp
        .findOne({ _id: "5d1c792edba522402fc3e242" })
        .then(company => {
          console.log(company);
          getDistance(
            [dbRes[randomIndex].address],
            [company.address],
            distance => {
              res.render("random-restaurant", {
                dbRes: dbRes[randomIndex],
                distance,
                navlayout: true
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
