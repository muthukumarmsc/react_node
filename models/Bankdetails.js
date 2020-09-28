const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let bankDetails = new Schema({
	userId:{
		type: Schema.Types.ObjectId, ref: 'users',
		index: true
	},
	BankName:{
		type: String, 
		default: ''
	},
	Accountno:{
		type: Number,
		 default: '',
		 index: true
	},
	BeneficiaryName:{
		type: String, default: '',
	},
	IFSCcode:{
		type: String, default: '',
	},
	AccountType:{
		type: String, default: '',
	},
});

module.exports = mongoose.model('bankDetails',bankDetails,'bankDetails');
