const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SubscriptionSchema = new Schema({
  name: {
    type: String,
  },
  categoryname:{
    type:String,
  },
  price:{
    type:Number,
  },
  duration:{
    type:String,
  },
  features:{
    type:String,
  },
  active:{
  type:String,
}
});

SubscriptionSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

SubscriptionSchema.set('toJSON', {
  virtuals: true
});

module.exports = Subscription = mongoose.model("subscription", SubscriptionSchema,"subscription");
