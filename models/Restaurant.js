const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  name: String,
  typeOfCuisine: [String],
  // regimeAlimentaire: {
  //   type: [String],
  //   enum: ["vegan", "veggie", "carnivore", "gluten free"]
  // },
  address: String,
  speed: {
    quick: {
      type: Number,
      default: 0
    },
    medium: {
      type: Number,
      default: 0
    },
    slow: {
      type: Number,
      default: 0
    }
  }, // incrementation en fonction de l'experience user
  takeout: { type: String, enum: ["Take away", "Eat in", "Both"] },
  recommendations: [String],
  image: { type: String },
  favorites: [{ type: Schema.Types.ObjectId, ref: "Users" }],
  verified: { type: Boolean, default: false }
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;

// console.log(Restaurant.address);

// address = JSON.parse(JSON.stringify(address));
