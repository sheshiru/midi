const express = require("express");
const router = new express.Router();
const Restaurant = require("../models/Restaurant");
const uploadCloud = require("../config/cloudinary.js");

router.post(
  "/user-add-restaurant",
  uploadCloud.single("restaurant_img"),
  (req, res) => {
    // const newImg = { name, ref, size, description, price, category, id_tag };

    if (req.file) newImg.restaurant_img = req.file.secure_url;
    Restaurant.create(newImg)
      .then(newRest => {
        console.log(newRest);
        res.redirect("/contribute");
      })
      .catch(error => console.error("error addind new restaurant:", error));
  }
);

module.exports = router;
