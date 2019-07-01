const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const companySchema = new Schema({
  name: String,
  address: String,
  userList: {type: Schema.Types.ObjectId, ref: "User"},
  logo: {type: String, default:"../public/medias/img/company-default-logo.png"}
})

const Company = mongoose.model("Company", companySchema);
module.exports = Company;