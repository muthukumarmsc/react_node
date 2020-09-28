const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RegionSchema = new Schema({
  name: {
    type: String,
  }
});

RegionSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

RegionSchema.set('toJSON', {
  virtuals: true
});

module.exports = Region = mongoose.model("region", RegionSchema,"region");
