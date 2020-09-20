const express = require("express");
const router = express.Router();
const passport = require("passport");
const tokenVerify = require("../strategies/tokenVerify");

passport.use(require("../strategies/passport.config"));
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

router.post("/register", require("./register"));
router.post("/login", require("./login"));

router.post("/addstore", tokenVerify, require("./addStore"));
router.post("/neareststore", tokenVerify, require("./nearestStore"));
router.post("/maximumincome", tokenVerify, require("./maxIncome"));

module.exports = router;
