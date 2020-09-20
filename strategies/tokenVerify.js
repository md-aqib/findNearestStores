const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    let token = req.headers.token;
    if (token) {
      let decoded = await jwt.verify(token, process.env.SECRET);
      if (!decoded) {
        return res.json({ message: "Unauthorized Request" });
      } else {
        req.decoded = decoded;
        next();
      }
    } else {
      return res.json({ message: "Unauthorized Request" });
    }
  } catch (err) {
    next(err);
  }
};
