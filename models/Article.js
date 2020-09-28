const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Article = new Schema({
  Articlename: {
    type: String
  },
  maincategoryId: {
    type: Schema.Types.ObjectId,
    ref: 'category',
    index: true
  },
  content:{
    type:String,
    required:true
  },
  status: {
    type: String,
    default: 1, // 0 - deactive, 1-active
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Article', Article, 'Article');