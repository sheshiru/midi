const express = require("express");
const router = new express.Router();
const Restaurant = require("../models/Restaurant");
const uploadCloud = require("../config/cloudinary.js");

router.post("/admin-forms", uploadCloud.single("image"), (req, res) => {
  const newResto = ({
    name,
    address,
    typeOfCuisine,
    recommendations,
    speed,
    takeout,
    image
  } = req.body);
  if (req.file) newResto.image = req.file.secure_url;
  Restaurant.create(newResto)
    .then(resto => {})
    .catch(error => console.error("error creating restaurant:", error));
});
