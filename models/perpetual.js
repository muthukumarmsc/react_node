const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let perpetual = new Schema({

	tiker_root:{
		type:String
		/*required:true,
		index: true */
	},
	expiry_date:{
		type:String,
		default:'Perpetual Contracts'
    },
	initial_margin:{
		type:String,
		required:true,   //in percentage
		index: true
	},
	maint_margin:{
		type:String,
		required:true,   //in percentage
		index: true
	},
	interest_base_symbol:{
		type:String,
		default:''
	},
	interest_quote_symbol:{
		type:String,
		default:''
	},
	funding_premium_symbol:{
		type:String,
		default:''
	},

	funding_rate:{
		type:String,
		default:''
	},
	leverage:{
		type:String,
		default:''
	},
	maker_rebate:{
		type:String,
		default:''
	},
	taker_fees:{
		type:String,
		default:''
	},
	funding_interval:{
		type:String,
		default:''
	},
	next_funding:{
		type:String,
		default:''
	},
	markprice:{
		type:String,
		default:''   //mark price
	},
	index_price:{
		type:String,
		default:''   //index price
	},
	mark_price:{
		type:String,
		default:'' //market price
	},
	adl:{
		type:String,
		default:'enable'
	},
	mark_method:{
		type:String,
		default:''
	},
	risk_limit:{
		type:String,
		default:''
	},
	risk_step:{
		type:String,
		default:''
	},
	open_interest:{
		type:String,
		default:''
	},
	turnover:{
		type:String,
		default:''
	},
	turnover:{
		type:String,
		default:''
	},
	total_volume:{
		type:String,
		default:''
	},
	contract_size:{
		type:String,
		default:''
	},
	minpriceincrement:{
		type:String,
		default:''
	},
	maxpriceincrement:{
		type:String,
		default:''
	},
	maxquantity:{
		type:String,
		default:''
	},
	minquantity:{
		type:String,
		default:''
	},
	minmargin:{
		type:String,
		default:''
	},
	lotsize:{
		type:String,
		default:1
	},
	first_currency:{
		type:String,
		default:'',
		index:true
	},
	second_currency:{
		type:String,
		default:'',
		index:true
	},
	dailyinterest : {
		type : String,
		default:0
	},
	low:{
		type:String,
		default:'0'
	},
	high:{
		type:String,
		default:'0'
	},
	last:{
		type:String,
		default:'0'
	},
	volume:{
		type:String,
		default:'0'
	},
	change:{
		type:String,
		default:'0'
	},
	total_volume:{
		type:String,
		default:'0'
	},
	liq_users:{
		type:String,
		default:'0'   //liquidating users
	},


});
perpetual.post('save', function(doc) {
  console.log('%s has been saved', doc._id);
});

module.exports = mongoose.model('perpetual',perpetual,'perpetual');
