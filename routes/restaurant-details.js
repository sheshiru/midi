const express = require("express");
const router = new express.Router();
const Restaurant = require("../models/Restaurant");

router.get("/restaurant/:id", (req, res) => {
  Restaurant.findById(req.params.id)
    .then(resto => {
      let likesCount = resto.favorites.length
      res.render("restaurant-details", { resto, likesCount });
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
