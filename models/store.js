const mongoose = require("mongoose");
const { Schema } = mongoose;

let store = new Schema({
  storeId: String,
  storeName: String,
  income: String,
  city: String,
  storeAddress: String,
  storeLocation: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
    },
  },
});
store.index({ "storeLocation.coordinates": "2dsphere" });
module.exports = mongoose.model("store", store);
