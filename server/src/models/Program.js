const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Program",
  new mongoose.Schema({
    name: String,
    code: String,

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department"
    },

    academicYear: String,

    courseType: {
      type: String,
      enum: ["UG", "PG"]
    },

    entryType: {
      type: String,
      enum: ["Regular", "Lateral"]
    },

    admissionMode: {
      type: String,
      enum: ["Government", "Management"]
    },

    intake: Number,

    quotas: {
      KCET: { total: Number, filled: { type: Number, default: 0 }},
      COMEDK: { total: Number, filled: { type: Number, default: 0 }},
      Management: { total: Number, filled: { type: Number, default: 0 }}
    },

    supernumerary: {
      total: { type: Number, default: 0 },
      filled: { type: Number, default: 0 }
    }
  })
);