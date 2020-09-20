const DBstore = require("../models/store");

const createId = async () => {
  try {
    let count = await DBstore.countDocuments({});
    let newCount = ++count;
    let finalCount = newCount > 9 ? newCount + "" : "0" + newCount;
    return `STR-${finalCount}`;
  } catch (err) {
    throw new Error("Error in generating order id");
  }
};

module.exports = async (req, res, next) => {
  try {
    if (
      !req.body.storeName ||
      !req.body.income ||
      !req.body.city ||
      !req.body.storeAddress ||
      !req.body.long ||
      !req.body.lat
    ) {
      return res.json({
        success: false,
        message: "Please enter all the details",
      });
    } else {
      const storeData = new DBstore({
        storeId: await createId(),
        storeName: req.body.storeName,
        income: req.body.income,
        city: req.body.city,
        storeAddress: req.body.storeAddress,
        storeLocation: {
          coordinates: [req.body.long, req.body.lat],
        },
      });
      await storeData.save();

      return res.json({
        success: true,
        message: "Store added successfully",
      });
    }
  } catch (err) {
    next(err);
  }
};
