const express = require("express");
const router = new express.Router();

router.get(["/", "/home"], (req, res) => {
  res.render("home");
});

router.get("/restaurants", (req, res) => {
  res.render("restaurants");
})

router.get("/account", (req, res) => {
  res.render("user-account");
})

router.get("/random", (req, res) => {
  res.render("random-restaurant");
})

router.get("/wishlist", (req, res) => {
  res.render("wishlist");
})

router.get("/favorites", (req, res) => {
  res.render("favorites");
})


module.exports = router;
