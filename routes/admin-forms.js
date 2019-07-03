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
    takeout,
    image
  } = req.body;
  const newResto = {
    name,
    address,
    typeOfCuisine,
    recommendations,
    speed,
    takeout,
    image
  };
  if (req.file) newResto.image = req.file.secure_url;
  Restaurant.create(newResto)
    .then(resto => {
      res.redirect("/admin-forms", resto);
    })
    .catch(error => console.error("error creating restaurant:", error));
});

module.exports = router;
