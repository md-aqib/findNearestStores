const DBstore = require("../models/store");

module.exports = async (req, res, next) => {
  try {
    if (!req.params.distance || !req.body.long || !req.body.lat) {
      res.json({
        success: false,
        message: "Please enter all the details",
      });
    } else {
      const nearestStores = await DBstore.aggregate([
        {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: [
                parseFloat(req.body.long),
                parseFloat(req.body.lat),
              ],
            },
            distanceField: "dist.calculated",
            spherical: true,
          },
        },
        { $sort: { "dist.calculated": 1 } },
      ]);

      if (!nearestStores) {
        return res.json({
          success: false,
          message: "No data found",
        });
      }

      return res.json({
        success: true,
        message: "Nearest stores",
        data: nearestStores,
      });
    }
  } catch (err) {
    next(err);
  }
};
