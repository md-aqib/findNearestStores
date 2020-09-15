const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const register = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 5,
    max: 10,
  },
  age: Number,
  gender: {
    type: String,
    enum: ["MAN", "WOMAN", "OTHER"],
    required: true,
  },
});

register.pre("save", function (next) {
  if (this.password) {
    bcrypt.genSalt(8, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(this.password, salt, function (err, hash) {
        if (err) return next(err);
        this.password = hash;
        next(err);
      });
    });
  }
});

module.exports = mongoose.model("register", register);
