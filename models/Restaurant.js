const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  name: String,
  typeOfCuisine: [{type: Schema.Types.ObjectId, ref:"Cuisine"}],
  distance: Number,
  speed: {type: String, enum:["Fast","Medium","Slow"]},
  image: {type: String, required: true},
  takeout: {type: String, enum:["Takeout", "Eat in", "Both"]},
  recommendations: [String],
  favorites: [{type: Schema.Types.ObjectId, ref: "Users"}]
})

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
module.exports = Restaurant;