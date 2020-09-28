const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SupermerchantSchema = new Schema({
  name: {
    type: String,
  }
});

SupermerchantSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

SupermerchantSchema.set('toJSON', {
  virtuals: true
});

module.exports = Supermerchant = mongoose.model("supermerchant", SupermerchantSchema,"supermerchant");
