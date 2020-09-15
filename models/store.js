const mongoose = require("mongoose");
const { Schema } = mongoose;

let store = new Schema({
  storeId: String,
  storeName: String,
  income: String,
  city: String,
  storeAddress: String,
  storeLocation: {
    default: "Point",
    coordinates: [Number],
  },
});
store.index({ "storeLocation.coordinates": "2dsphere" });
module.exports = mongoose.model("store", store);
