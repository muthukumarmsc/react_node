const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CitySchema = new Schema({
  name: {
    type: String,
  }
});

CitySchema.virtual('id').get(function () {
  return this._id.toHexString();
});

CitySchema.set('toJSON', {
  virtuals: true
});

module.exports = City = mongoose.model("city", CitySchema,"city");
