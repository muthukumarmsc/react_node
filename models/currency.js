const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let currency = new Schema({
	currencyName:{
		type: String, default: ''
	},
	currencySymbol:{
		type: String, default: ''
	},
	fee:{
		type: Number, default: 0
	},
	minimum:{
		type: Number, default: 0
	},
	status:{
		type: String, default: 1, // 0 - deactive, 1-active
	},
});

module.exports = mongoose.model('currency',currency,'currency');
