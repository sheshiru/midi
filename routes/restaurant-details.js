const express = require("express");
const router = new express.Router();
const Restaurant = require("../models/Restaurant");
const distance = require("google-distance-matrix");
const getDistance = require("./google_distance");
const comp = require("../models/Company");

router.get("/restaurant/:id", async (req, res) => {
  try {
    const resto = await Restaurant.findById(req.params.id);
    let likesCount = resto.favorites.length;
    const company = await comp.findById(req.query.companyId);
    getDistance([resto.address], [company.address], distance => {
      res.render("restaurant-details", {
        likesCount,
        resto,
        company,
        distance,
        navlayout: true
      });
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
