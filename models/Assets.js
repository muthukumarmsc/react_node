const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Assets = new Schema({
	balance:{
		type:Number,
		required:true,
		index: true
	},
	fundingbalance:{
		type:Number,
		default:0
	},
	userId:{
		type: Schema.Types.ObjectId, ref: 'users',
		index: true
	},
	currency:{
		type: Schema.Types.ObjectId, ref: 'currency', index:true
	},
	currencySymbol:{
		type: String, default: '',
		index: true
	},
	currencyAddress:{
		type: String, default: '',
		index: true
	},
	privateKey:{
		type: String, default: '',
		index: true
	},
	tempcurrency:{
		type:Number,   //bonus balance added in usd
		default:'0'
	},
	spotwallet:{
		type:Number,   //bonus balance added in usd
		default:'0'
	}
});

module.exports = mongoose.model('Assets',Assets,'Assets');
