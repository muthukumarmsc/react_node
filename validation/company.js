const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateCompanyInput(data,type) {
    let errors = {};
    if(type == 'company'){
      data.name = !isEmpty(data.name) ? data.name : "";
      data.mobileoperatorname = !isEmpty(data.mobileoperatorname) ? data.mobileoperatorname : "";
      data.address = !isEmpty(data.address) ? data.address : "";
    }
  
    if(type == 'company'){
        if (Validator.isEmpty(data.name)) {
            errors.name = "Name field is required";
        }
          if (Validator.isEmpty(data.mobileoperatorname)) {
            errors.mobileoperatorname = "Mobile operator name field is required";
        }
      
          if (Validator.isEmpty(data.address)) {
            errors.address = "Address field is required";
        } 
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};