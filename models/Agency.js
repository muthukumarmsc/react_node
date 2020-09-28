const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AgencySchema = new Schema({
  name: {
    type: String,
  },
  mobileoperatorname:{
    type:String,
  },
  address:{
    type:String,
  },
  active:{
  type:String,
}
});

AgencySchema.virtual('id').get(function () {
  return this._id.toHexString();
});

AgencySchema.set('toJSON', {
  virtuals: true
});

module.exports = Agency = mongoose.model("agency", AgencySchema,"agency");
