const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
// require('dotenv').config({ debug: process.env.DEBUG })
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();

let port = process.env.PORT || 5000;

/*A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body).
This object will contain key-value pairs, where the value can be a string or array (when extended is false),
or any type (when extended is true).*/
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));

app.use(passport.initialize());
app.use(passport.session());

let mongoOptions = {
  useNewUrlParser: true,
  dbName: "nearest_store",
  autoIndex: false,
  useUnifiedTopology: true,
};
console.log(process.env.MONGO_URI);
mongoose
  .connect(process.env.MONGO_URI, mongoOptions)
  .then(() => console.log("MongoDB connected Successfully..."))
  .catch((err) => console.log("Error:", err));

app.use(morgan("dev"));

const routes = require("./controllers/route");
app.use("/api", routes);

app.listen(port, () => console.log(`app listening at port ${port}`));
