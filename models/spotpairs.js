const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let spotpairs = new Schema({

	tiker_root:{
		type:String
		/*required:true,
		index: true */
	},
	maker_rebate:{
		type:String,
		default:''
	},
	taker_fees:{
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

	turnover:{
		type:String,
		default:''
	},
	total_volume:{
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


});

module.exports = mongoose.model('spotpairs',spotpairs,'spotpairs');
