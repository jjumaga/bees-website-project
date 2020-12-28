const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  lastName: String,
  email: String,
  password: String,
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
