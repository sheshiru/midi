const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  name: String,
  typeOfCuisine: String, //[{ type: Schema.Types.ObjectId, ref: "Cuisine" }],
  regimeAlimentaire: {
    type: [String],
    enum: ["vegan", "veggie", "carnivore", "gluten free"]
  },
  distance: Number,
  // speed: { type: String, enum: ["Fast", "Medium", "Slow"] },
  speed: {
    quick: Number,
    medium: Number,
    slow: Number
  }, // incrementation en fonction de l'experience user
  image: { type: String, required: true },
  takeout: { type: String, enum: ["Take away", "Eat in", "Both"] },
  recommendations: [String],
  favorites: [{ type: Schema.Types.ObjectId, ref: "Users" }]
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
module.exports = Restaurant;