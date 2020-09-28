const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateAddCurrencyInput(data) {
    let errors = {};
     data.currencyName = !isEmpty(data.currencyName) ? data.currencyName : "";
     data.currencySymbol = !isEmpty(data.currencySymbol) ? data.currencySymbol : "";
    if (Validator.isEmpty(data.currencyName)) {
        errors.currencyName = "Currency Name field is required";
    }
    if (Validator.isEmpty(data.currencySymbol)) {
        errors.currencySymbol = "Currency Symbol field is required";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};
