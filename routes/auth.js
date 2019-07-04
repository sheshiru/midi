// router.get("/account", (req, res) => {
//   res.render("auth/user-account", { navlayout: true });
// });

const express = require("express");
const router = new express.Router();
const bcrypt = require("bcrypt");
const User = require("./../models/User.js");

router.get("/login", (req, res) => {
  let bigWrapper = "wrapper-pages";
  res.render("auth/login", { navlayout: true, bigWrapper });
});
router.post("/login", (req, res) => {
  const user = req.body;

  if (!user.email || !user.password) {
    return res.render("auth/login", {
      errorMessage: "Please fill in all the fields."
    });
  }

  User.findOne({ usermail: user.email })
    .then(dbRes => {
      if (!dbRes)
        return res.render("auth/login", {
          msg: {
            text: "Bad email adress or password.",
            status: "error"
          }
        });

      if (bcrypt.compareSync(user.password, dbRes.password)) {
        req.session.currentUser = dbRes;
        return res.redirect("/");
      } else
        return res.render("auth/login", {
          msg: {
            text: "Bad email adress or password.",
            status: "error"
          }
        });
    })
    .catch(dbErr => {
      next(dbErr);
    });
});

router.get("/signup", (req, res) => {
  let bigWrapper = "wrapper-pages";
  res.render("auth/signup", { navlayout: true, bigWrapper });
});

router.post("/signup", (req, res, next) => {
  // return console.log(req.body);

  const newUser = req.body; // so req.body contains the submited informations (out of the post)
  console.log(newUser.email);

  if (
    !newUser.name ||
    !newUser.lastname ||
    !newUser.email ||
    !newUser.password
  ) {
    res.render("auth/signup", {
      msg: {
        text: "All fields are required.",
        status: "warning"
      }
    });
    return;
  } else {
    User.findOne({ email: newUser.email })
      .then(dbRes => {
        if (dbRes) {
          res.render("auth/signup", {
            msg: {
              text: "User already exists !",
              status: "warning"
            }
          });
          return;
        }

        const salt = bcrypt.genSaltSync(10);
        const hashed = bcrypt.hashSync(newUser.password, salt);
        newUser.password = hashed;

        User.create(newUser)
          .then(dbRes => {
            console.log("hey", dbRes);
            req.session.msg = {
              text: "You signed up successfully !",
              status: "success"
            };
            res.redirect("/");
          })
          .catch(err => console.log(err));
      })
      .catch(dbErr => next(dbErr));
  }
});

//-------------------------------------------------------
// LOGOUT PART
//-------------------------------------------------------
router.get("/logout", (req, res, next) => {
  req.session.destroy(err => {
    // can't access session here
    res.redirect("/login");
  });
});

module.exports = router;
