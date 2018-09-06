var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Message} = require('./models/message');


var app = express();

app.use(bodyParser.json());

app.post('/messages',(req, res) => {
    var mes = new Message({
        text : req.body.text,
        creator: req.body.creator
    });

    mes.save().then((doc) => {
        res.send(doc);
    },(e) => {
        res.status(400).send(e);
    });
});

app.listen(3000, () => {
    console.log('started server');
});