const express = require("express");
const router = new express.Router();
const Restaurant = require("../models/Restaurant");
const distance = require("google-distance-matrix");
const getDistance = require("./google_distance");
const comp = require("../models/Company");
const guardRoute = require("./../utils/guard-route");

router.get("/restaurant/:id", guardRoute, async (req, res) => {
  try {
    let bigWrapper = "wrapper-pages";
    const resto = await Restaurant.findById(req.params.id);
    const company = await comp.findById(req.query.companyId);
    let speed;
    getDistance([resto.address], [company.address], distance => {
      if (
        resto.speed.quick >= resto.speed.slow &&
        resto.speed.quick >= resto.speed.medium
      ) {
        speed = "fast";
      }
      if (
        resto.speed.slow >= resto.speed.quick &&
        resto.speed.slow >= resto.speed.medium
      ) {
        speed = "slow";
      }
      if (
        resto.speed.medium >= resto.speed.slow &&
        resto.speed.medium >= resto.speed.quick
      ) {
        speed = "normal";
      }
      if (
        resto.speed.medium == resto.speed.quick &&
        resto.speed.medium == resto.speed.slow
      ) {
        speed = "normal";
      }
      res.render("restaurant-details", {
        resto,
        company,
        speed,
        distance,
        bigWrapper,
        navlayout: true
      });
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
