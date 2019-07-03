const express = require("express");
const router = new express.Router();
const Restaurant = require("../models/Restaurant");
const uploadCloud = require("../config/cloudinary.js");

router.get("/contribute", (req, res) => {
  res.render("contribute", { navlayout: true });
});
router.post(
  "/user-add-restaurant",
  uploadCloud.single("restaurant_img"),
  (req, res) => {
    if (req.file) newImg.restaurant_img = req.file.secure_url;
    Restaurant.create(req.body)
      .then(newRest => {
        console.log(newRest);
        res.render("/contribute");
      })
      .catch(error => console.error("error addind new restaurant:", error));
  }
);

module.exports = router;
