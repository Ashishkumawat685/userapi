const mongoose = require("mongoose");

const users = new mongoose.Schema({
  FirstName: String,
  LastName: String,
  Email: String,
  Mobile: Number,
  Password: String,
  CunPassword: String,
});

const modelschema = mongoose.model("newuser", users);
module.exports = modelschema;
