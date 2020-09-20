const jwt = require("jsonwebtoken");
const passport = require("passport");

module.exports = (req, res, next) => {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({
        success: false,
        message: "Authentication Failed",
      });
    }

    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return async function loginUser(req, res, next) {
        try {
          let payload = { email: req.user.email, userName: req.user.userName };
          let token = jwt.sign(payload, process.env.SECRET);
          //return res.redirect('/users/' + user.username);
          return res.json({
            success: true,
            message: "User Authenticated",
            token: token,
          });
        } catch (err) {
          next(err);
        }
      };
    });
  })(req, res, next);
};
