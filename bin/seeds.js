const mongoose = require("mongoose");
// const Restaurant = require("./../models/Restaurant");

const restaurants = [
  {
    name: "Bao Bao",
    typeOfCuisine: ["Chinese"],
    address: "4 rue Alexandre Dumas Paris",
    speed: "Medium",
    image: "https://cdn1.centralapp.com/api/v1/media/gallery-large/place-5753-t3ecunt851une4s34lbz.jpeg",
    takeout: "Both",
    recommendations: ["Ground pork lamen", "Xiao Long Bao"],
    favorites: []
  },
  {
    name: "Le Comptoir du Poulet",
    typeOfCuisine: ["Chicken"],
    address: "3 rue de Lagny Paris",
    speed: "Medium",
    image: "https://f.roocdn.com/images/menus/96486/header-image.jpg",
    takeout: "Both",
    recommendations: ["1/2 poulet"],
    favorites: []  
  },
  {
    name: "Mme Shawn",
    typeOfCuisine: ["Thai"],
    address: "23 rue Paul Bert Paris",
    speed: "Medium",
    image: "https://www.sortiraparis.com/images/55/14066/259051-mme-shawn-bistrot-thailandais-arrive-chez-ubereats.jpg",
    takeout: "Both",
    recommendations: [],
    favorites: []  
  }
]

const companies = [
  {
    name: "IronHack",
    address: "226 boulevard Voltaire Paris",
    // userList: [],
    logo: "https://www.refreshmiami.com/wp-content/uploads/2018/07/55085_logo-ironhack.png"
  }
]

module.exports = restaurants;
// module.exports = companies;
