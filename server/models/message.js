var mongoose = require('mongoose');

var Message = mongoose.model('Message', {
   
    text : {
        type: String,
        trim: true,
        minlength: 1,
        required: true
    },
    creator: {
        type: String,
        trim: true,
        minlength: 1,
        required: true
    }


});

module.exports = {Message};