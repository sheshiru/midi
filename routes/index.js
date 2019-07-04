const express = require("express");
const router = new express.Router();
const Company = require("../models/Company");
const Restaurant = require("../models/Restaurant");
// const User = require("../models/User");
const seeds = require("../bin/seeds");
const getDistance = require("./google_distance");

router.get(["/", "/home"], (req, res) => {
  // let bigWrapper = "bg-home";
  // let navbar = "navbar-home";
  // let mainTitle = "midi";
  res.render("home", { navlayout: false });
});

router.get(
  ["/restaurants", "/restaurants/200", "/restaurants/800", "/restaurants/far"],
  (req, res) => {
    let restauritos = [];
    let bigWrapper = "wrapper-restaurants";
    Restaurant.find({ verified: true })
      .then(restos => {
        if (!restos.length) {
          res.render("restaurants", { bigWrapper, navlayout: true });
          return;
        }
        Company.find().then(company => {
          company = company[0];
          restos.forEach(resto => {
            getDistance([resto.address], [company.address], distance => {
              resto["distance"] = distance;
              const restu = JSON.parse(JSON.stringify(resto));
              restu.distance = distance;
              restauritos.push(restu);
              console.log(restauritos);
              if (restauritos.length === restos.length) {
                if (req.url === "/restaurants/200") {
                  restauritos = restauritos.filter(oneResto => {
                    return oneResto.distance.slice(0, 3) <= 0.2;
                  });
                }
                if (req.url === "/restaurants/800") {
                  restauritos = restauritos.filter(oneResto => {
                    return (
                      oneResto.distance.slice(0, 3) > 0.2 &&
                      oneResto.distance.slice(0, 3) <= 0.8
                    );
                  });
                }
                if (req.url === "/restaurants/far") {
                  restauritos = restauritos.filter(oneResto => {
                    return oneResto.distance.slice(0, 3) > 0.8;
                  });
                }
                res.render("restaurants", {
                  company,
                  restos: restauritos,
                  bigWrapper,
                  navlayout: true
                });
              }
            });
          });
        });
      })
      .catch(err => console.error(err));
  }
);

router.get("/restaurants/tag/:typeOfCuisine", (req, res) => {
  let bigWrapper = "wrapper-restaurants";
  Restaurant.find({ typeOfCuisine: req.params.typeOfCuisine, verified: true })
    .then(restos => {
      res.render("restaurants", { restos, navlayout: true, bigWrapper });
    })
    .catch(err => console.error(err));
});

// FUNCTION BELOW NOT WORKING: WHAT DO WE DO ABOUT THE SPEED?
router.get("/restaurants/speed/:speed", (req, res) => {
  let bigWrapper = "wrapper-restaurants";
  Restaurant.find({ speed: req.params.speed, verified: true })
    .then(restos => {
      res.render("restaurants", { restos, navlayout: true, bigWrapper });
    })
    .catch(err => console.error(err));
});

router.get("/restaurants/distance/200", (req, res) => {
  let bigWrapper = "wrapper-restaurants";
  Restaurant.find({ distance: { $lte: 200 } })
    .then(restos => {
      res.render("restaurants", { restos, navlayout: true, bigWrapper });
    })
    .catch(err => console.error(err));
});

router.get("/restaurants/distance/800", (req, res) => {
  let bigWrapper = "wrapper-restaurants";
  Restaurant.find({ distance: { $lte: 800 } })
    .then(restos => {
      res.render("restaurants", { restos, navlayout: true, bigWrapper });
    })
    .catch(err => console.error(err));
});

router.get("/restaurants/distance/far", (req, res) => {
  let bigWrapper = "wrapper-restaurants";
  Restaurant.find({ distance: { $gt: 800 } })
    .then(restos => {
      console.log(restos);
      res.render("restaurants", { restos, navlayout: true, bigWrapper });
    })
    .catch(err => console.error(err));
});

router.get("/admin-forms", (req, res) => {
  res.render("admin-forms", { navlayout: true });
});

router.get("/wishlist", (req, res) => {
  res.render("wishlist", { navlayout: true });
});

router.get("/favorites", (req, res) => {
  res.render("favorites", { navlayout: true });
});

// Restaurant.insertMany(seeds)
//   .then(res => console.log("restaurants added"))
//   .catch(err => console.log("error adding restaurants:", err));

// Company.insertMany(seeds)
//   .then(res => console.log("companies added", res))
//   .catch(err => console.log("error adding companies:", err));

// User.insertMany(seeds)
//   .then(res => console.log("user added", res))
//   .catch(err => console.log("error adding user:", err));

module.exports = router;
