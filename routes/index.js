const express = require("express");
const router = new express.Router();
const Company = require("../models/Company");
const Restaurant = require("../models/Restaurant");
const guardRoute = require("./../utils/guard-route");
const seeds = require("../bin/seeds");
const getDistance = require("./google_distance");

router.get(["/", "/home"], (req, res) => {
  res.render("home", { navlayout: false });
});

router.get(
  [
    "/restaurants/speed/slow",
    "/restaurants/speed/medium",
    "/restaurants/speed/fast"
  ],
  (req, res) => {
    let oneUser = req.session.currentUser;
    let bigWrapper = "wrapper-restaurants";
    let restauritos = [];
    Restaurant.find({ verified: true })
      .then(restos => {
        const restu = JSON.parse(JSON.stringify(restos));
        restauritos = restu;
        // console.log(restauritos);
        restauritos.forEach(resto => {
          if (
            resto.speed.quick >= resto.speed.slow &&
            resto.speed.quick >= resto.speed.medium
          ) {
            resto.speedStr = "fast";
          }
          if (
            resto.speed.slow >= resto.speed.quick &&
            resto.speed.slow >= resto.speed.medium
          ) {
            resto.speedStr = "slow";
          }
          if (
            resto.speed.medium >= resto.speed.slow &&
            resto.speed.medium >= resto.speed.quick
          ) {
            resto.speedStr = "normal";
          }
          if (
            resto.speed.medium == resto.speed.quick &&
            resto.speed.medium == resto.speed.slow
          ) {
            resto.speedStr = "normal";
          }
        });
        if (restauritos.length === restos.length) {
          if (req.url === "/restaurants/speed/slow") {
            restauritos = restauritos.filter(oneResto => {
              return oneResto.speedStr === "slow";
            });
          }
          if (req.url === "/restaurants/speed/medium") {
            restauritos = restauritos.filter(oneResto => {
              return oneResto.speedStr === "normal";
            });
          }
          if (req.url === "/restaurants/speed/fast") {
            restauritos = restauritos.filter(oneResto => {
              return oneResto.speedStr === "fast";
            });
          }
        }
        res.render("restaurants", {
          restos: restauritos,
          bigWrapper,
          oneUser,
          navlayout: true
        });
      })
      .catch(err => console.error(err));
  }
);

router.get(
  ["/restaurants", "/restaurants/200", "/restaurants/800", "/restaurants/far"],
  guardRoute,
  (req, res) => {
    let oneUser = req.session.currentUser;
    let restauritos = [];
    let bigWrapper = "wrapper-restaurants";
    const favResto = [...oneUser.favorites];
    // console.log(favResto);
    Restaurant.find({ verified: true })
      .then(restos => {
        console.log(restos);
        if (!restos.length) {
          res.render("restaurants", { bigWrapper, navlayout: true });
          return;
        }
        Company.find().then(company => {
          console.log(company);
          company = company[0];
          restos.forEach(resto => {
            getDistance([resto.address], [company.address], distance => {
              resto["distance"] = distance;
              const restu = JSON.parse(JSON.stringify(resto));
              restu.distance = distance;
              restauritos.push(restu);
              // console.log(restauritos);
              restauritos.forEach(oneResto => {
                oneResto.isFav = false;
                if (favResto.includes(oneResto._id)) {
                  oneResto.isFav = true;
                }
              });
              if (restauritos.length === restos.length) {
                if (req.url === "/restaurants/200") {
                  restauritos = restauritos.filter(oneResto => {
                    return oneResto.distance.slice(0, 3) <= 0.2;
                  });
                }
                if (req.url === "/restaurants/800") {
                  restauritos = restauritos.filter(oneResto => {
                    return (
                      oneResto.distance.slice(0, 3) > 0.2 &&
                      oneResto.distance.slice(0, 3) <= 0.8
                    );
                  });
                }
                if (req.url === "/restaurants/far") {
                  restauritos = restauritos.filter(oneResto => {
                    return oneResto.distance.slice(0, 3) > 0.8;
                  });
                }
                res.render("restaurants", {
                  needsAxios: true,
                  company,
                  restos: restauritos,
                  bigWrapper,
                  navlayout: true,
                  oneUser
                });
              }
            });
          });
        });
      })
      .catch(err => console.error(err));
  }
);

router.get("/restaurants/tag/:typeOfCuisine", (req, res) => {
  let bigWrapper = "wrapper-restaurants";
  Restaurant.find({ typeOfCuisine: req.params.typeOfCuisine, verified: true })
    .then(restos => {
      res.render("restaurants", { restos, navlayout: true, bigWrapper });
    })
    .catch(err => console.error(err));
});

router.get("/admin-forms", (req, res) => {
  res.render("admin-forms", { navlayout: true });
});

router.get("/wishlist", (req, res) => {
  res.render("wishlist", { navlayout: true });
});

router.get("/favorites", (req, res) => {
  res.render("favorites", { navlayout: true });
});

// Restaurant.insertMany(seeds)
//   .then(res => console.log("restaurants added"))
//   .catch(err => console.log("error adding restaurants:", err));

// Company.insertMany(seeds)
//   .then(res => console.log("companies added", res))
//   .catch(err => console.log("error adding companies:", err));

// User.insertMany(seeds)
//   .then(res => console.log("user added", res))
//   .catch(err => console.log("error adding user:", err));

module.exports = router;
