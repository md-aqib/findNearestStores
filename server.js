const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let port = process.env.PORT || 3000;

let mongoOptions = {
  useNewUrlParser: true,
  dbName: "nearest_store",
  autoIndex: false,
  useUnifiedTopology: true,
};
mongoose
  .connect(process.env.MONGO_URI, mongoOptions)
  .then(() => console.log("MongoDB connected Successfully"))
  .catch((err) => console.log("Error:", err));

app.use(morgan("dev"));

app.listen(port, () => console.log(`app listening at port ${port}`));
