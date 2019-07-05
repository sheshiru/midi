// router.get("/account", (req, res) => {
//   res.render("auth/user-account", { navlayout: true });
// });

const express = require("express");
const router = new express.Router();
const bcrypt = require("bcrypt");
const User = require("./../models/User.js");
const guardRoute = require("./../utils/guard-route");

router.get("/login", (req, res) => {
  let bigWrapper = "wrapper-pages";
  res.render("auth/login", { navlayout: true, bigWrapper });
});

router.post("/login", (req, res) => {
  let bigWrapper = "wrapper-pages";
  const user = req.body;
  console.log(req.body);
  if (!user.email || !user.password) {
    console.log("FIELDS ARE EMPTY");
    return res.render("auth/login", {
      errorMessage: "Please fill in all the fields.",
      navlayout: true,
      bigWrapper
    });
  }
  User.findOne({ email: req.body.email })
    .then(dbRes => {
      let bigWrapper = "wrapper-pages";
      if (!dbRes) {
        console.log("BAD INFOS");
        return res.render("auth/login", {
          msg: {
            text: "Bad email adress or password.",
            status: "error"
          },
          bigWrapper
        });
      }

      if (bcrypt.compareSync(user.password, dbRes.password)) {
        console.log("ici");

        req.session.currentUser = dbRes;
        console.log(dbRes);

        return res.redirect("/restaurants");
      } else console.log("pas bon");

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
            console.log("hey", req.session);
            req.session.msg = {
              text: "You signed up successfully !",
              status: "success"
            };
            res.redirect("/login");
          })
          .catch(err => console.log(err));
      })
      .catch(dbErr => next(dbErr));
  }
});

//-------------------------------------------------------
// LOGOUT PART
//-------------------------------------------------------
router.get("/logout", guardRoute, (req, res, next) => {
  req.session.destroy(err => {
    // can't access session here
    res.redirect("/");
  });
});

module.exports = router;
