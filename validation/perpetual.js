const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateUpdatePerpetualInput(data) {
    let errors = {};
    data.initial_margin = !isEmpty(data.initial_margin) ? data.initial_margin : "";
    data.maint_margin = !isEmpty(data.initial_margin) ? data.maint_margin : "";
    data.interest_base_symbol = !isEmpty(data.interest_base_symbol) ? data.interest_base_symbol : "";
    data.interest_quote_symbol = !isEmpty(data.interest_quote_symbol) ? data.interest_quote_symbol : "";
    data.funding_premium_symbol = !isEmpty(data.funding_premium_symbol) ? data.funding_premium_symbol : "";
    data.risk_limit = !isEmpty(data.risk_limit) ? data.risk_limit : "";
    data.risk_step = !isEmpty(data.risk_step) ? data.risk_step : "";
    data.minpriceincrement = !isEmpty(data.minpriceincrement) ? data.minpriceincrement : "";
    data.maxpriceincrement = !isEmpty(data.maxpriceincrement) ? data.maxpriceincrement : "";
    data.maxquantity = !isEmpty(data.maxquantity) ? data.maxquantity : "";
    data.lotsize = !isEmpty(data.lotsize) ? data.lotsize : "";
    data.contract_size = !isEmpty(data.contract_size) ? data.contract_size : "";
    data.funding_interval = !isEmpty(data.contract_size) ? data.funding_interval : "";
    data.second_currency = !isEmpty(data.second_currency) ? data.second_currency : "";
    data.first_currency = !isEmpty(data.first_currency) ? data.first_currency : "";
    data.leverage = !isEmpty(data.leverage) ? data.leverage : "";
    data.maker_rebate = !isEmpty(data.maker_rebate) ? data.maker_rebate : "";
    data.taker_fees = !isEmpty(data.taker_fees) ? data.taker_fees : "";
    data.mark_price = !isEmpty(data.mark_price) ? data.mark_price : "";

    if (Validator.isEmpty(data.initial_margin)) {
        errors.initial_margin = "Initial margin field is required";
    }
     if (Validator.isEmpty(data.mark_price)) {
        errors.mark_price = "Market price field is required";
    }

    if (Validator.isEmpty(data.maint_margin)) {
        errors.maint_margin = "Maintanence margin field is required";
    }

    if (Validator.isEmpty(data.interest_base_symbol)) {
        errors.interest_base_symbol = "Interest Base Symbol field is required";
    }

    if (Validator.isEmpty(data.interest_quote_symbol)) {
        errors.interest_quote_symbol = "Interest Quote Symbol field is required";
    }

    if (Validator.isEmpty(data.funding_premium_symbol)) {
        errors.funding_premium_symbol = "Funding premium symbol field is required";
    }

    if (Validator.isEmpty(data.risk_limit)) {
        errors.risk_limit = "Risk limit field is required";
    }

    if (Validator.isEmpty(data.risk_step)) {
        errors.risk_step = "Risk step field is required";
    }

    if (Validator.isEmpty(data.contract_size)) {
        errors.contract_size = "Contract size is required";
    }

    if (Validator.isEmpty(data.funding_interval)) {
        errors.funding_interval = "Funding interval is required";
    }

    if (Validator.isEmpty(data.minpriceincrement)) {
        errors.minpriceincrement = "Min price increment field is required";
    }

    if (Validator.isEmpty(data.maxpriceincrement)) {
        errors.maxpriceincrement = "Max price field is required";
    }

    if (Validator.isEmpty(data.maxquantity)) {
        errors.maxquantity = "Max quantity field is required";
    }

    if (Validator.isEmpty(data.lotsize)) {
        errors.lotsize = "Lot size field is required";
    }

    if (Validator.isEmpty(data.second_currency)) {
        errors.second_currency = "Second currency field is required";
    }

    if (Validator.isEmpty(data.first_currency)) {
        errors.first_currency = "First currency field is required";
    }
     if (Validator.isEmpty(data.leverage)) {
        errors.leverage = "Leverage field is required";
    }
     if (Validator.isEmpty(data.maker_rebate)) {
        errors.maker_rebate = "Maker Rebate field is required";
    }
     if (Validator.isEmpty(data.taker_fees)) {
        errors.taker_fees = "Taker fees field is required";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};




