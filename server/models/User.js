const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const dateFormat = require("../utils/dateFormat");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },

  //1: 1 or 2 drinks, 2: get a solid buzz, 3: drunk, but not crazy, 4: YOLO
  drink_level: [{
    type: Number,
  }],

  // 1: $7 or less/drink; 2: $8-14/drink; 3: $15-20/drink; 4: over $20/drink
  price_range: [{
    type: Number,
  }],

  interests: [
    {
      type: Schema.Types.ObjectId,
      ref: "Interest",
    },
  ],

  drinking_buddies: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  creation_date: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },

});

// set up pre-save middleware to create password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
