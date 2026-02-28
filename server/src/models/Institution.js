const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Institution",
  new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, unique: true }
  })
);