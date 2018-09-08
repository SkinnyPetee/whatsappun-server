var express = require('express');
var bodyParser = require('body-parser');
const _ = require('lodash');

var {mongoose} = require('./db/mongoose');
var {Message} = require('./models/message');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');


var app = express();

app.use(bodyParser.json());

const port = process.env.PORT || 3000 ;




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

app.get('/messages',(req,res) => {
    Message.find().then((messages) => {
        res.send({messages});
    },(e) => {
        res.status(400).send(e);
    });
});

app.post('/users',(req, res) => {
    var body = _.pick(req.body,['email','password']);
    var user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken()
        
    }).then((token) => {
        res.header('x-auth',token).send(user)
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.get('/users',(req,res) => {
    User.find().then((user) => {
        res.send({user});
    },(e) => {
        res.status(400).send(e);
    });
});

app.post('/users/login',(req,res) => {
    var body = _.pick(req.body,['email','password']);
    
    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth',token).send(user)
        })
    }).catch((e) => {
        res.status(400).send();
    });
});

app.listen(port, () => {
    console.log(`started server on ${port}`);
});