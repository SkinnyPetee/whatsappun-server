var mongoose = require('mongoose');

var Chat = mongoose.model('Chat', {
   
    name : {
        type: String,
        trim: true,
        minlength: 1,
        required: true
    },
    _user1Id : {
        type: mongoose.Schema.Types.ObjectId,
        required : true

    },
    _user2Id : {
        type: mongoose.Schema.Types.ObjectId,
        required : true

    }
  


});

module.exports = {Chat};