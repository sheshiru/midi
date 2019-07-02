const express = require("express");
const router = new express.Router();

router.get(["/", "/home"], (req, res) => {
  let bigWrapper = "bg-home";
  let navbar = "navbar-home";
  let mainTitle = "midi";
  res.render("home", { bigWrapper, navbar, mainTitle });
});

router.get("/restaurants", (req, res) => {
  let bigWrapper = "bg-rest";
  let navbar = "navbar-rest";
  res.render("restaurants", { bigWrapper, navbar });
});

router.get("/account", (req, res) => {
  res.render("user-account");
});

router.get("/random", (req, res) => {
  res.render("random-restaurant");
});

router.get("/wishlist", (req, res) => {
  res.render("wishlist");
});

router.get("/favorites", (req, res) => {
  res.render("favorites");
});

module.exports = router;
