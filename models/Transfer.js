const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let TransferSchema = new Schema({
	sender:{
		type:String,
	},
	receiver:{
		type:String,
	},
   amount:{
   	type:Number,
   },
	status:{
		type: String, default: 'Success', // Confirm,Reject,Pending,Cancel
	},
  created_date:{
		type:Date,
		default: Date.now
	},
});


module.exports = Transfer = mongoose.model("transfer", TransferSchema,'transfer');

