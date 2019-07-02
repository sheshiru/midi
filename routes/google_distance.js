const express = require("express");
const router = new express.Router();
const distance = require("google-distance-matrix");

distance.key(process.env.APIKEY);

var origins = ["ironhack paris"];
var destinations = ["bao bao paris"];

distance.matrix(origins, destinations, function(err, distances) {
  if (!err) {
    console.log(distances.rows[0].elements[0].distance.text);
  }
});

module.exports = router;
