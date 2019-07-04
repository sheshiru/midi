const express = require("express");
const router = new express.Router();
const Restaurant = require("../models/Restaurant");
const uploadCloud = require("../config/cloudinary.js");
const guardRoute = require("./../utils/guard-route");

router.get("/contribute", guardRoute, (req, res) => {
  let bigWrapper = "wrapper-pages";
  res.render("contribute", { navlayout: true, bigWrapper });
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
        let bigWrapper = "wrapper-pages";
        console.log(newRest);
        res.render("contribute", {
          successMsg:
            "Thanks for your contribution! We'll check the infos and publish your suggestion very soon",
          navlayout: true,
          bigWrapper
        });
      })
      .catch(error => console.error("error adding new restaurant:", error));
  }
);

module.exports = router;
