const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateadvertisement(data,type) {
    let errors = {};
   
      data.categories = !isEmpty(data.categories) ? data.categories : "";
      data.image = !isEmpty(data.image) ? data.image : "";
  
        if (Validator.isEmpty(data.categories)) {
            errors.categories = "Categories field is required";
        }
        
        if (Validator.isEmpty(data.url)) {
            errors.image = "Image field is required";
        } 
    if (Validator.isEmpty(data.description)) {
        errors.description = "Description field is required";
    }
    
     
    return {
        errors,
        isValid: isEmpty(errors)
    };
};