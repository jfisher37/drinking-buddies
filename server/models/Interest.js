const { Schema, model } = require("mongoose");

const interestSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  }

});

const Interest = model("Interest", interestSchema);

module.exports = Interest;
