const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Department",
  new mongoose.Schema({
    name: String,
    campus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campus"
    }
  })
);