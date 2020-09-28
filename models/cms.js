const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let cms = new Schema({
	identifier:{
		type:String
	},
	subject:{
		type:String,
		required:true,
	},
	content:{
		type:String,
		required:true,
	},
	status:{
		type:Boolean,default:true
	},
	created_date:{
		type:Date,
		default: Date.now
	},
	 image :[],
});

module.exports = mongoose.model('cms',cms,'cms');
