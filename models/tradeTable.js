const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var filledSchema = new Schema({
  "buyuserId"          : {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
  "selluserId"         : {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
  "user_id"            : {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
  "sellId"             : {type: mongoose.Schema.Types.ObjectId, ref: 'tradeTable'},
  "buyId"              : {type: mongoose.Schema.Types.ObjectId, ref: 'tradeTable'},
  "pair"               : {type: mongoose.Schema.Types.ObjectId, ref: 'perpetual',index: true},
  "filledAmount"       : Number,
  "Price"              : Number,
  "order_cost"         : Number,
  "firstCurrency"  	   : {type: String,default : '',index: true },
  "secondCurrency"     : {type: String,default : '',index: true },
  "pairname"           : {type:String,index: true},
  "forced_liquidation" : {type:Boolean,default: false},
  "Fees"     	         : Number,
  "Type"               : {type:String,index: true},
  created_at           : {type:Date,default:Date.now},
  "status"             : {type:String,index: true},
  "position_status"    : {type:String,default: '1'},
  beforeBalance        : { type: String, default : 0},
  afterBalance         : { type: String, default : 0},
  beforebonusBalance   : { type: String, default : 0},
  afterbonusBalance    : { type: String, default : 0},
  order_value          : { type: String, default : 0},
	
});


let tradeTable = new Schema({
	quantity       : {
	type           : Number,
	required       : true,
	index          : true
	},
	price          : {
	type           : Number,
	required       : true,	
	index          : true
    },
    trigger_price  : {
	type           : Number,
	required       : true,	
	index          : true
    },
	orderCost      : {
	type           : Number,
	required       : true,   
	index          : true
	},
	orderValue     : {
	type           : String,
	default        : ''
	},
	leverage       : {
	type           : String,
	default        : ''
	},
	userId         : {
	type           : Schema.Types.ObjectId, ref: 'users'
	},
	pair           : {
	type           : Schema.Types.ObjectId, ref: 'perpetual'
	},
	pairName       : {
	type           : String,
	default        : ''
	},
	postOnly       : {
	type           : Boolean,
	default        : false
	},
	Liqprice       : {
	type           : Number,
	default        : 0
	},
	reduceOnly     : {
	type           : Boolean,
	default        : false
	},
	beforeBalance  : {
	type           : String,
	default        : 0
	},
	afterBalance   : {
	type           : String,
	default        : 0
	},
	beforebonusBalance  : {
	type           : String,
	default        : 0
	},
	afterbonusBalance   : {
	type           : String,
	default        : 0
	},
	firstCurrency  : {
	type           : String,
	default        : '',
	index          : true
	},
	secondCurrency : {
	type           : String,
	default        : '',
	index          : true
	},
	buyorsell      : {
	type           : String,
	default        : ''     //buy or sell
	},
	trigger_type   : {
	type           : String,
	default        : ''
	},
	orderType      : {
	type           : String,
	default        : ''     // Limit market stop
	},
	timeinforcetype: {
	type           : String,
	default        : ''     // Goodtillcancelled FOK Immediateorcancel
	},
	orderDate      : {
	type           : Date,
	default        : Date.now()
	},
	filledAmount   : {
	type           : Number,
	default        : 0
	},
	positionFilled : {
	type           : Number,
	default        : 0
	},
	pairid 		   : {
	type           : String,
	default        : 0
	},
	stopstatus : {
	type           : String,
	default        : '0'     // 0-Conditional, 1- stop/takeprofit, trailing stop , 2-Active 
	},
	trigger_ordertype: {
	type      	: String,
	default  	: null
	},
	status         : {
	type           : String,
	default        : 0, //0-new, 1-completed, 2-partial, 3- Cancel, 4- Conditional
	index          : true
	},
	position_status: {
	type           : String,
	default        : 1, //1-active, 0-deactive
	index          : true
	},
	trailstop: {
	type           : String,
	default        : '0', //true -  Trail stop , False- Non trail stop
	index          : true
	},
	forced_liquidation: {
	type           : Boolean,
	default        : '0', //true -  Trail stop , False- Non trail stop
	index          : false
	},
	trailstopdistance: {
	type           : Number,
	default        : 0,  
	},
	btcprice: {
	type           : String,
	default        : 0,  
	},
	taker_fees: {
	type           : String,
	default        : 0,   //percentage fee  
	},
	filled         : [filledSchema]
});



module.exports = mongoose.model('tradeTable',tradeTable,'tradeTable');