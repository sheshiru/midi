const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const companySchema = new Schema({
  name: String,
  address: {
    street: String,
    num: Number,
    city: String,
    country: String,
    zip: Number
  },
  userList: { type: Schema.Types.ObjectId, ref: "User" },
  logo: {
    type: String,
    default: "../public/medias/img/company-default-logo.png"
  }
});

const Company = mongoose.model("Company", companySchema);
module.exports = Company;
