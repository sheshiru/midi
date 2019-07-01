const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  name: String,
  firstName: String,
  password: String,
  company: {type: Schema.Types.ObjectId, ref: "Company"},
  seniority: Date,
  memberSince: Date,
  photo: String,
  favorites: {type: Schema.Types.ObjectId, ref: "Restaurant"},
  wishlist: {type: Schema.Types.ObjectId, ref: "Restaurant"},
  admin: Boolean
})

const User = mongoose.model("User", userSchema);
module.exports = Company;