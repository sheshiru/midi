const express = require("express");
const router = new express.Router();
const Restaurant = require("../models/Restaurant");
const uploadCloud = require("../config/cloudinary");

router.get("/editRestau/:id", (req, res) => {
  Restaurant.findById(req.params.id)
    .then(resto => {
      res.render("restaurant_edit", { resto });
    })
    .catch(err => console.error(err));
});

router.post("/editRestau/:id", uploadCloud.single("image"), (req, res) => {
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
  if (req.file) newResto.image = req.file.secure_url;
  Restaurant.findByIdAndUpdate(req.params.id, req.body)
    .then(resto => {
      console.log("successfully edited restaurant", resto);
      res.redirect("/restaurants");
    })
    .catch(err =>
      console.error("an error occurred while editing the restaurant:", err)
    );
});

module.exports = router;
