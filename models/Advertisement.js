const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AdvertisementSchema = new Schema({
	categories:{
	 	type: String,
	},
	image:{
		type: String,
	},
	url:{
		type: String,
	},
	description:{
		type: String,
	},
   active:{
        type:String,
    }
   
});
AdvertisementSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

AdvertisementSchema.set('toJSON', {
  virtuals: true
});
module.exports = mongoose.model('advertisement',AdvertisementSchema,'advertisement');
