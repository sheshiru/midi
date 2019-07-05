const mongoose = require("mongoose");
// const Restaurant = require("./../models/Restaurant");

const restaurants = [
  {
    name: "Bao Bao",
    typeOfCuisine: ["Chinese"],
    address: "4 rue Alexandre Dumas Paris",
    speed: { quick: 0, medium: 6, slow: 0 },
    image:
      "https://cdn1.centralapp.com/api/v1/media/gallery-large/place-5753-t3ecunt851une4s34lbz.jpeg",
    takeout: "Both",
    recommendations: ["Ground pork lamen", "Xiao Long Bao"],
    favorites: [],
    verified: true
  },
  {
    name: "Le Comptoir du Poulet",
    typeOfCuisine: ["Chicken"],
    address: "3 rue de Lagny Paris",
    speed: { quick: 4, medium: 0, slow: 0 },
    image: "https://f.roocdn.com/images/menus/96486/header-image.jpg",
    takeout: "Both",
    recommendations: ["1/2 poulet"],
    favorites: [],
    verified: true
  },
  {
    name: "Mme Shawn",
    typeOfCuisine: ["Thai"],
    address: "23 rue Paul Bert Paris",
    speed: { quick: 0, medium: 6, slow: 0 },
    image:
      "https://www.sortiraparis.com/images/55/14066/259051-mme-shawn-bistrot-thailandais-arrive-chez-ubereats.jpg",
    takeout: "Both",
    recommendations: [],
    favorites: [],
    verified: true
  },
  {
    name: "Café Titon",
    typeOfCuisine: ["German"],
    address: "34 Rue Titon 75011 Paris",
    speed: { quick: 3, medium: 0, slow: 0 },
    image:
      "https://u.tfstatic.com/restaurant_photos/933/210933/169/612/cafe-titon-vue-detail-table-a1f7c.jpg",
    takeout: "Both",
    recommendations: [],
    favorites: [],
    verified: true
  },
  {
    name: "Café Moco",
    typeOfCuisine: ["French"],
    address: "177bis Boulevard Voltaire, 75011 Paris",
    speed: { quick: 0, medium: 0, slow: 3 },
    image:
      "https://s3-media3.fl.yelpcdn.com/bphoto/R1P5MELboIx63B4cp5PcXA/ls.jpg",
    takeout: "Both",
    recommendations: [],
    favorites: [],
    verified: true
  },
  {
    name: "Gharbia Bio",
    typeOfCuisine: ["Egyptian"],
    address: "174 Boulevard Voltaire, 75011 Paris",
    speed: { quick: 5, medium: 0, slow: 0 },
    image:
      "https://uploads.lebonbon.fr/source/2018/paris/juin/mel/Gharbia2.jpg",
    takeout: "Both",
    recommendations: [],
    favorites: [],
    verified: true
  }
];

const companies = [
  {
    name: "IronHack",
    address: "226 boulevard Voltaire Paris",
    // userList: [],
    logo:
      "https://www.refreshmiami.com/wp-content/uploads/2018/07/55085_logo-ironhack.png"
  }
];

const user = [
  {
    name: "cecile",
    firstName: "Pham",
    email: "cec@cec.cec"
  }
];

module.exports = restaurants;
// module.exports = companies;
// module.exports = user;
