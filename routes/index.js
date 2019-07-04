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

router.get("/restaurants", (req, res) => {
  const restauritos = [];
  let bigWrapper = "wrapper-restaurants";
  Restaurant.find({ verified: true })
    .then(restos => {
      if (!restos.length) {
        res.render("restaurants", { bigWrapper, navlayout: true });
        return;
      }
      Company.find().then(company => {
        // console.log(company[0]._id);

        company = company[0];
        // console.log("restos:", restos);

        restos.forEach(resto => {
          // console.log(resto.address, company.address);
          getDistance([resto.address], [company.address], distance => {
            // console.log("resto:", resto.address, "company:", company.address);

            resto["distance"] = distance;
            const restu = JSON.parse(JSON.stringify(resto));
            restu.distance = distance;
            restauritos.push(restu);
            if (restauritos.length === restos.length) {
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
});

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

router.get("/restaurants/distance/:distance", (req, res) => {
  let bigWrapper = "wrapper-restaurants";
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
