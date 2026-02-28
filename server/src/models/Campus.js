const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Campus",
  new mongoose.Schema({
    name: String,
    institution: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institution"
    }
  })
);