const express = require("express");
const router = new express.Router();
const Restaurant = require("../models/Restaurant");

router.get("/random", (req, res) => {
  Restaurant.findById(req.params.id)
    .then(resto => {
      res.render("restaurant-details", { resto: resto });
    })
    .catch(error => {
      console.log(error);
    });
});
