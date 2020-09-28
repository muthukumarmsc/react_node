const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AccountSchema = new Schema({
  name: {
    type: String,
  }
});

AccountSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

AccountSchema.set('toJSON', {
  virtuals: true
});

module.exports = account = mongoose.model("account", AccountSchema,"account");
