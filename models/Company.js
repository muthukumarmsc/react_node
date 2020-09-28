const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CompanySchema = new Schema({
  userName: {
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

CompanySchema.virtual('id').get(function () {
  return this._id.toHexString();
});

CompanySchema.set('toJSON', {
  virtuals: true
});

module.exports = Company = mongoose.model("company", CompanySchema,'company');
