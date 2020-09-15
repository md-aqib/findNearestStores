const mongoose = require("mongoose");
const { Schema } = mongoose;

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

module.exports = mongoose.model("register", register);
