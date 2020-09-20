const DBstore = require("../models/store");

module.exports = async (req, res, next) => {
  try {
    const maxIncome = await DBstore.aggregate([
      {
        $group: {
          _id: "$city",
          maxIncome: { $max: "$income" },
        },
      },
      { $sort: { maxIncome: -1 } },
    ]);

    if (!maxIncome) {
      return res.json({
        success: false,
        message: "No data found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Maximum income citywise",
      data: maxIncome,
    });
  } catch (err) {
    next(err);
  }
};
