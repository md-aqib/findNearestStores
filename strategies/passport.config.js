const DBregister = require("../models/register");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

module.exports = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
    session: false,
  },
  async function (username, password, done) {
    try {
      const user = await DBregister.findOne({ email: username });

      if (!user) {
        return done(null, false);
      }

      let checkPass = await bcrypt.compare(password, user.password);
      if (!checkPass) {
        return done(null, false);
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
);
