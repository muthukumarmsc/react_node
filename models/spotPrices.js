const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let spotPrices = new Schema({
	pairname:{
		type:String, 
		required:true,
		index: true 
	},
	pair:{
		type: Schema.Types.ObjectId, ref: 'perpetual',
		index:true
	},
	price:{
		type: Number, default: 0,
		index: true 
	},
	createdAt:{
		type: Date, default: new Date(),
		index: true 
	},
});

module.exports = mongoose.model('spotPrices',spotPrices,'spotPrices');