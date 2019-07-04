const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  lastname: String,
  email: String,
  password: String,
  company: { type: Schema.Types.ObjectId, ref: "Company" },
  seniority: Date,
  memberSince: Date,
  photo: {
    type: String,
    default: "https://www.whittierfirstday.org/our-team/default-user-image/"
  },
  favorites: { type: Schema.Types.ObjectId, ref: "Restaurant" },
  wishlist: { type: Schema.Types.ObjectId, ref: "Restaurant" },
  admin: Boolean
});

const User = mongoose.model("User", userSchema);
module.exports = User;
