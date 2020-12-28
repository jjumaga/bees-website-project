require("dotenv").config();
require("./../config/mongo");

const BeeModel = require("./../models/Bee");

const bees = [
  {
    hiveNumber: 1,
    queen: "triple stripe, double spot",
    supplierName: "BeeCan",
    age: "4 summers",
    honeyType: "clover",
  },
  {
    hiveNumber: 2,
    queen: "single stripe, triple spot",
    supplierName: "BeeCan",
    age: "2 summers",
    honeyType: "wild flower",
  },
  {
    hiveNumber: 3,
    queen: "double stripe, no spot",
    supplierName: "BeeCan",
    age: "5 summers",
    honeyType: "Acacia",
  },
];

BeeModel.deleteMany()
  .then(async () => {
    await BeeModel.insertMany(bees);
  })
  .catch((err) => {
    console.error(err);
  });
