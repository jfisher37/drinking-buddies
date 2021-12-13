const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

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
  },

  created_by: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  creation_date: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },

});

const Interest = model("Interest", interestSchema);

module.exports = Interest;
