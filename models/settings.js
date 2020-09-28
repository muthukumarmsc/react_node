const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let settings = new Schema({

	email:{
		type:String, 
		required:true,
		index: true 
	},
	contact_person:{
		type:String, 
		index: true
    },
	sitename:{
		type:String,
		required:true,
		index: true
	},
	site_description:{
		type:String,
		// required:true,
	},
	favorite_image:{
		type:String,
	}, 
	sitelogo:{
		type:String
	},
	phone_number:{
		type:String, 
	},
	mobile_number:{
		type:String, 
	},
	company_info_link:{
		type:String, 
	},
	license_info_link:{
		type:String, 
	},
	address:{
		type:String, 
		required:true,
	},
	google_analytics:{
		type:String
	},
 	tax_amount: {
		type:Number, // in percentage 
	}, 
	social_link1:{
		type:String
	}, 
	social_link2:{
		type:String
	}, 
	social_link3:{
		type:String
	}, 
	social_link4:{
		type:String
	}, 
	social_link5:{
		type:String
	}, 
	reg_code:{
		type:String
	}, 
	copyright_text:{
		type:String, 
	}, 
	working_day:{
		type:String, 
	},
	working_hours:{
		type:String, 
	},
	maintanancestate: {
        type: Boolean,
        default: false    //false- disable, true- enable maintanancestate
      }, 
    forcedliq:{
    	type:String,
    	default:"Enable"
	},
	AccountName:{
		type:String, 
	},
	AccountNo:{
		type:String, 
	},
	BankName:{
		type:String, 
	},
	IFSCcode:{
		type:String, 
	},
	BranchName:{
		type:String, 
	},
	AccountType:{
		type:String, 
	},
	

});

module.exports = mongoose.model('settings',settings,'settings');