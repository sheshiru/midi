const express = require("express");
const router = express.Router();

router.get("/signup", (req, res) => {
  res.render("auth/signup", { navlayout: true });
});
router.get("/login", (req, res) => {
  let bigWrapper = "wrapper-login";
  res.render("auth/login", { navlayout: true, bigWrapper });
});
router.get("/account", (req, res) => {
  res.render("auth/user-account", { navlayout: true });
});

module.exports = router;
