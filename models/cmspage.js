const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let cmscontent = new Schema({
  about_company: {
    type: String,
  },
  about_ourvision: {
    type: String,
  },
  contactus: {
    type: String,
  },
  referralprogram: {
    type: String,
  },
  referral_referandearn: {
    type: String,
  },
  home_leverage_content: {
    type: String,
  },
  home_bull_bearmarket: {
    type: String,
  },
  home_fastandstable: {
    type: String,
  },
  home_reliability: {
    type: String,
  },
  home_security: {
    type: String,
  },
  home_highleverage: {
    type: String,
  },
});

module.exports = mongoose.model("cmscontent", cmscontent, "cmscontent");


