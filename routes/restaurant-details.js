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
    let oneUser = req.session.currentUser;
    const favResto = [...oneUser.favorites];
    let resto = await Restaurant.findById(req.params.id);

    let likesCount = resto.favorites.length;
    const company = await comp.findById(req.query.companyId);
    getDistance([resto.address], [company.address], distance => {
      let isFav = false;
      if (favResto.includes(resto._id.toString())) {
        isFav = true;
      }
      res.render("restaurant-details", {
        likesCount,
        resto,
        isFav,
        company,
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
