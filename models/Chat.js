const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ChatSchema = new Schema({
    message: {
        type: String,
        default: ""
    },
    userId : {
      type: Schema.Types.ObjectId, ref: 'users',
  		index: true
    },
    userName : {
      type: String,
      default: ""
    },
    createddate: {
        type: Date,
        default: Date.now
    }
});
module.exports = Chat = mongoose.model("chat", ChatSchema);
