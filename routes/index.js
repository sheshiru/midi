const express = require("express");
const router = new express.Router();
const Company = require("../models/Company");
const Restaurant = require("../models/Restaurant");
const seeds = require("../bin/seeds");
const getDistance = require("./google_distance");

router.get(["/", "/home"], (req, res) => {
  // let bigWrapper = "bg-home";
  // let navbar = "navbar-home";
  // let mainTitle = "midi";
  res.render("home", { navlayout: false });
});

router.get("/restaurants", (req, res) => {
  const restauritos = [];
  Restaurant.find()
    .then(restos => {
      Company.find().then(company => {
        // console.log(company[0]._id);
        let bigWrapper = "wrapper-restaurants";
        company = company[0];
        // console.log("restos:", restos);

        restos.forEach(resto => {
          // console.log(resto.address, company.address);
          getDistance([resto.address], [company.address], distance => {
            // console.log("resto:", resto.address, "company:", company.address);
            resto["distance"] = distance;
            const restu = JSON.parse(JSON.stringify(resto));
            restu.distance = distance;
            restauritos.push(restu);
            if (restauritos.length === restos.length) {
              res.render("restaurants", {
                company,
                restos: restauritos,
                bigWrapper,
                navlayout: true
              });
            }
          });
        });
      });
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

module.exports = router;

function addDistance(array, company, clbk) {}
