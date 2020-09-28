const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateUpdateUserInput(data,type) {
    let errors = {};
    data.userName = !isEmpty(data.userName) ? data.userName : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.businessPhoneNumber =!isEmpty(data.businessPhoneNumber) ? data.businessPhoneNumber : "";
    if (Validator.isEmpty(data.userName)) {
        errors.userName = "Name field is required";
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
     if (Validator.isEmpty(data.businessPhoneNumber)) {
        errors.businessPhoneNumber = "Business phone number field is required";
      } 
    if(type == 'profile'){
      if (Validator.isEmpty(data.businessPhoneNumber)) {
        errors.businessPhoneNumber = "Business phone number field is required";
      } 
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};
