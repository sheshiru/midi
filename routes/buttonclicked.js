const express = require("express");
const router = new express.Router();

const Restaurant = require("./../models/Restaurant.js");

router.post("/api/restaurant/:id", (req, res) => {
  const str = `speed.${req.body.speed}`;
  Restaurant.updateOne({ _id: req.params.id }, { $inc: { [str]: 1 } })
    .then(dbRes => res.send(dbRes))
    .catch(dbErr => console.log(dbErr));
});

module.exports = router;
