const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BankTransactionSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    index: true,
  },
  currency: {
    type: String,
    index: true,
  },
  Amount: {
    type: Number,
    default: 0,
  },
  TransactionType: {
    type: String,
    default: "",
  },
  ReferenceId: {
    type: String,
    default: "",
  },
  Remarks: {
    type: String,
    default: "",
  },
  Toaccountno: {
    type: String,
    default: "",
  },
  toifsccode:{
    type: String,
    default: "",
  },
  tobankname:{
    type: String,
    default: "",
  },
  depositimage:{
    type:String
  },
  status:{
		type:String,default:1 //1-Completed
	},
  transferType: {
    type: String, // Deposit Withdraw
    default: "",
  },

  status: {
    type: String,
    default: "Pending", //1-Completed 0-Pending 2-Cancelled
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = BankTransaction = mongoose.model(
  "BankTransaction",
  BankTransactionSchema
);
