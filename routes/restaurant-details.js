const express = require("express");
const router = new express.Router();
const Restaurant = require("../models/Restaurant");

router.get("/restaurant/:id", (req, res) => {
  Restaurant.findById(req.params.id)
    .then(resto => {
      res.render("restaurant-details", { resto });
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
