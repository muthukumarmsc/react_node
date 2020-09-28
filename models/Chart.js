const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ChartSchema = new Schema({
    type: {
        type: String,
        default: ""  // 1 , 5 ,30,60,1d,1w,1m
    },
    pairname: {
        type: String,
        default: "" 
    },
    data : [],
    createddate: {
        type: Date,
        default: Date.now
    }
});
module.exports = Chart = mongoose.model("chart", ChartSchema);
