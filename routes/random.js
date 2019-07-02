const express = require("express");
const router = new express.Router();
const Restaurant = require("../models/Restaurant");

router.get("/random", (req, res) => {
  Restaurant.getRandom()
  .then(randomResto => {
    res.render("restaurant-details", {resto: randomResto[0]});
  })
  .catch(error => {
    console.log(error)
  })
})
