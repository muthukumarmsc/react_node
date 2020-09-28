
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  userName: {
    type: String,
  },
  password:{
    type:String,
  },
  businessPhoneNumber:{
    type:Number,
  },
  mobileoperatorname:{
    type:String,
  },
  profile:{
    type:String,
  },
  mobileMoneyPhoneNumber:{
    type:Number,
  },
  superMerchant:{ type: Schema.Types.ObjectId, ref: 'supermerchant' },
  agencyName:{ type: Schema.Types.ObjectId, ref: 'agency' },
  city:{  type: Schema.Types.ObjectId, ref: 'city' },
  region:{ type: Schema.Types.ObjectId, ref: 'region' },
  address:{
    type:String,
  },
  mapAddress:{
    type:String,
  },
  country:{
    type:String,
  },
  account:{
    type:String
  },
  amount:{
    type:String,
  },
  email: {
    type: String,
    // required: true
  },
  mpin:{
    type:Number,
  },
active:{
  type:String,
}
});

UserSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

UserSchema.set('toJSON', {
  virtuals: true
});

module.exports = User = mongoose.model("users", UserSchema);
