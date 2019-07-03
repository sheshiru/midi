const express = require("express");
const router = new express.Router();
const Restaurant = require("../models/Restaurant");

router.get("/editRestau/:id", (req, res) => {
  Restaurant.findById(req.params.id)
    .then(resto => {
      res.render("restaurant_edit", { resto });
    })
    .catch(err => console.error(err));
});

router.post("/editRestau/:id", (req, res) => {});
