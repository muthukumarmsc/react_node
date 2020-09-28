const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateRegisterInput1(data,type) {
  console.log('data : ',data)
    let errors = {};
    if(type == 'register1'){
      data.userName = !isEmpty(data.userName) ? data.userName : "";
      data.email = !isEmpty(data.email) ? data.email : "";
      data.businessPhoneNumber=!isEmpty(data.businessPhoneNumber) ? data.businessPhoneNumber : "";
      // data.mobileMoneyPhoneNumber=!isEmpty(data.mobileMoneyPhoneNumber) ? data.mobileMoneyPhoneNumber : "";
      data.superMerchant = !isEmpty(data.superMerchant) ? data.superMerchant : "";
      data.agencyName = !isEmpty(data.agencyName) ? data.agencyName : "";
      data.address = !isEmpty(data.address) ? data.address : "";
      data.account = !isEmpty(data.account) ? data.account : "";
      data.mapAddress = !isEmpty(data.mapAddress) ? data.mapAddress : "";
      data.city = !isEmpty(data.city) ? data.city: "";
      data.region = !isEmpty(data.region) ? data.region:"";
      data.country=!isEmpty(data.country) ? data.country:"";
    }
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";
    if(type == 'register'){
        if (Validator.isEmpty(data.userName)) {
            errors.userName = "Name field is required";
        }
         if (Validator.isEmpty(data.businessPhoneNumber)) {
            errors.businessPhoneNumber = "Business phone number field is required";
        }
   
          if (data.superMerchant=='') {
            errors.superMerchant = "Super merchant field is required";
        }
        if (data.agencyName=='') {
            errors.agencyName = "Agency name field is required";
        }
        if (Validator.isEmpty(data.address)) {
            errors.address = "address field is required";
        }
        if (Validator.isEmpty(data.mapAddress)) {
            errors.mapAddress = "Map paddress field is required";
        }
        if (data.city=='') {
            errors.city = "city field is required";
        }
        if (data.region=='') {
          errors.region = "Region field is required";
        }
        if (Validator.isEmpty(data.country)) {
            errors.country = "Country field is required";
        }

         if (Validator.isEmpty(data.account)) {
        errors.account = "Account field is required";
    }
        if (Validator.isEmpty(data.email)) {
            errors.email = "Email field is required";
        } else if (!Validator.isEmail(data.email)) {
            errors.email = "Email is invalid";
        }
         
    }
   
    return {
        errors,
        isValid: isEmpty(errors)
    };
};