const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BeeSchema = new Schema({
  hiveNumber: Number,
  queen: String,
  supplierName: String,
  age: String,
  honeyType: String,
});

const BeeModel = mongoose.model("bee", BeeSchema);

module.exports = BeeModel;
