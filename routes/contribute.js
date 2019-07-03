const express = require("express");
const router = new express.Router();
const Restaurant = require("../models/Restaurant");
const uploadCloud = require("../config/cloudinary.js");

router.get("/contribute", (req, res) => {
  res.render("contribute", { navlayout: true });
});
router.post(
  "/user_add_restaurant",
  uploadCloud.single("restaurant_img"),
  (req, res) => {
    const { name, typeOfcuisine, address, takeout, recommendations } = req.body;
    console.log(takeout === "Take away");

    const newResto = {
      name,
      typeOfcuisine,
      address,
      takeout,
      recommendations
    };

    if (req.file) newResto.image = req.file.secure_url;
    console.log(newResto);
    Restaurant.create(newResto)

      .then(newRest => {
        console.log(newRest);
        res.redirect("/contribute");
      })
      .catch(error => console.error("error adding new restaurant:", error));
  }
);

module.exports = router;