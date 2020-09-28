const Validator = require("validator");
const isEmpty   = require("is-empty");
module.exports  = function validateSubscribeInput(data,type) {
    let errors  = {};
    data.name   = !isEmpty(data.name) ? data.name : "";
    data.categoryname = !isEmpty(data.categoryname) ? data.categoryname : "";
    data.price =!isEmpty(data.price) ? data.price : "";
    data.duration =!isEmpty(data.duration) ? data.duration : "";
    data.features =!isEmpty(data.features) ? data.features : "";
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }
    if (Validator.isEmpty(data.price)) {
        errors.price = "Price field is required";
    } 

     if (Validator.isEmpty(data.categoryname)) {
        errors.categoryname = "Category name field is required";
      } 

      if (Validator.isEmpty(data.duration)) {
        errors.duration = "Duration field is required";
      } 
      if (Validator.isEmpty(data.features)) {
        errors.features = "Features field is required";
      } 
    
    return {
        errors,
        isValid: isEmpty(errors)
    };
};
