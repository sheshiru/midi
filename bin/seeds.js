const mongoose = require("mongoose");
// const Restaurant = require("./../models/Restaurant");

const restaurants = [
  {
    name: "Bao Bao",
    typeOfCuisine: ["Chinese"],
    distance: 80,
    speed: "Medium",
    image: "https://cdn1.centralapp.com/api/v1/media/gallery-large/place-5753-t3ecunt851une4s34lbz.jpeg",
    takeout: "Both",
    recommendations: ["Ground pork lamen", "Xiao Long Bao"],
    favorites: []
  },
  {
    name: "Le Comptoir du Poulet",
    typeOfCuisine: ["Chicken"],
    distance: 350,
    speed: "Medium",
    image: "https://f.roocdn.com/images/menus/96486/header-image.jpg",
    takeout: "Both",
    recommendations: ["1/2 poulet"],
    favorites: []  
  },
  {
    name: "Mme Shawn",
    typeOfCuisine: ["Thai"],
    distance: 300,
    speed: "Medium",
    image: "https://www.sortiraparis.com/images/55/14066/259051-mme-shawn-bistrot-thailandais-arrive-chez-ubereats.jpg",
    takeout: "Both",
    recommendations: [],
    favorites: []  
  }
]

module.exports = restaurants;
