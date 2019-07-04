const express = require("express");
const router = new express.Router();
const Restaurant = require("../models/Restaurant");

router.get("/search/resto", (req, res) => {
  // console.log(req.query);
  const regex = new RegExp(req.query.search, "i");
  Restaurant.find({ name: regex })
    .then(restos => {
      console.log(restos);
      res.json(restos);
    })
    .catch(err => console.error(err));
});

module.exports = router;
