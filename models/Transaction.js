const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TransactionSchema = new Schema({
  user_id : {
		type: mongoose.Schema.Types.ObjectId, ref: 'users',index: true
	},
	currency:{
		type  : String, index: true
	},
  fromaddress:{
		type  : String,
    default : ""
	},
	toaddress:{
		type  : String,
    default : ""
	},
  transferType:{
		type  : String,  // TOUSER, TOADMIN, 	Realized P&L
    default : ""
	},
	amount:{
		type  : Number,
    default : 0
	},
	token_receive:{
		type  : Number,
	},
	txid:{
		type  : String,
	},
	status:{
		type:String,default:1 //1-Completed
	},
	created_date:{
		type:Date,default:Date.now
	}
});

module.exports = Transaction = mongoose.model("Transaction",TransactionSchema);
