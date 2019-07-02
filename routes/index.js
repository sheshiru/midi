const express = require("express");
const router = new express.Router();
const Company = require("../models/Company");
const Restaurant = require("../models/Restaurant");
const seeds = require("../bin/seeds");

router.get(["/", "/home"], (req, res) => {
  // let bigWrapper = "bg-home";
  // let navbar = "navbar-home";
  // let mainTitle = "midi";
  res.render("home", { navlayout: false });
});

router.get("/restaurants", (req, res) => {
  Restaurant.find()
    .then(restos => {
      let bigWrapper = "wrapper-restaurants";
      res.render("restaurants", {
        restos,
        bigWrapper,
        navlayout: true
      });
    })
    .catch(err => console.error(err));
});

router.get("/account", (req, res) => {
  res.render("user-account");
});

router.get("/random", (req, res) => {
  res.render("random-restaurant");
});

router.get("/wishlist", (req, res) => {
  res.render("wishlist");
});

router.get("/favorites", (req, res) => {
  res.render("favorites");
});

// Restaurant.insertMany(seeds)
//   .then(res => console.log("restaurants added"))
//   .catch(err => console.log("error adding restaurants:", err));

// Company.insertMany(seeds)
//   .then(res => console.log("companies added", res))
//   .catch(err => console.log("error adding companies:", err));

module.exports = router;
