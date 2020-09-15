const DbRegister = require("../models/register");

module.exports = async (req, res) => {
  try {
    if (!req.body) {
      return res.json({
        success: false,
        message: "Please enter all details",
      });
    } else {
      registeredData = await DbRegister.findOne({ email: req.body.email });
      if (registeredData) {
        return res.json({
          success: false,
          message: "User already registered",
        });
      } else {
        let newData = new DbRegister({
          email: req.body.email,
          name: req.body.name,
          password: req.body.password,
          gender: req.body.gender,
          age: req.body.age,
        });
        await newData.save();
        return res.json({
          success: false,
          message: "User Registered",
        });
      }
    }
  } catch (ex) {
    console.log(__filename, ex);
    return res.json({
      success: false,
      message: "Something went wrong, Please try again after some time.",
    });
  }
};
