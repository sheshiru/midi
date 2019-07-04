const express = require("express");
const router = new express.Router();
const Restaurant = require("../models/Restaurant");
const uploadCloud = require("../config/cloudinary");

router.post("/admin-forms", uploadCloud.single("image"), (req, res) => {
  const {
    name,
    address,
    typeOfCuisine,
    recommendations,
    speed,
    takeout
  } = req.body;
  const newResto = {
    name,
    address,
    typeOfCuisine,
    recommendations,
    speed,
    takeout
  };
  newResto.verified = true;
  if (req.file) newResto.image = req.file.secure_url;
  Restaurant.create(newResto)
    .then(resto => {
      res.redirect("/restaurants");
    })
    .catch(error => console.error("error creating restaurant:", error));
});

module.exports = router;
