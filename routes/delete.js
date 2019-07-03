const express = require("express");
const router = new express.Router();
const Restaurant = require("../models/Restaurant");

router.get("/deleteRestau/:id", (req, res) => {
  Restaurant.findByIdAndRemove(req.params.id)
    .then(resto => {
      console.log(resto);
      res.redirect("/restaurants");
    })
    .catch(err => console.log(err));
});

module.exports = router;
