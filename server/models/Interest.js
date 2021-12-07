const { Schema, model } = require("mongoose");

const interestSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },

  popularity: {
    type: Number,
    default: 0,
  }

});

const Interest = model("Interest", interestSchema);

module.exports = Interest;
