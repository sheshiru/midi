const express = require("express");
const router = express.Router();

router.get("/signup", (req, res) => {
  res.render("auth/signup", { navlayout: true });
});
router.get("/login", (req, res) => {
  res.render("auth/login", { navlayout: true });
});
router.get("/account", (req, res) => {
  res.render("auth/user-account", { navlayout: true });
});

module.exports = router;
