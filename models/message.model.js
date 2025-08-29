const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    keyword:String,
    receivedText: String,
    replyText:String
    },
    {
        timestamps:true
    }
);

module.exports = mongoose.model('Message', messageSchema,"message");
