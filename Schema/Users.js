const mongoose = require("mongoose");

const users = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  gender: String,
  ip_address: String,
});

const modelschema = mongoose.model("newuser", users);
module.exports = modelschema;
