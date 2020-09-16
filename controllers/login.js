const DBlogin = require("../models/register");

module.exports = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.json({
        success: false,
        msg: "Please enter all details",
      });
    } else {
    }
  } catch (ex) {
    return res.json({
      success: false,
      msg: "Something went wrong",
    });
  }
};
