const port = 3000;
const bodyParser = require('body-parser');
var express = require("express");
var path = require('path');
var app = express();
var mongoose = require("mongoose");
var methodOverride = require("method-override");
//var user = require("./config/models/user")
var MongoClient = require("mongodb").MongoClient;

app.use(express.static('public'));
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost/TwoFoxes', { useNewUrlParser: true }, { useUnifiedTopology: true });

var userSchema = new mongoose.Schema({
    firstname : String,
    lastname : String,
    address : String,
    postcode : String,
    contact : Number
});

var user = mongoose.model('users', userSchema);

app.get('/view', function(req,res){
    user.find({}).then(user => res.json(user))
})

app.post('/insert-user', function(req,res){
    new user({
       firstname    : req.body.firstname,
       lastname     : req.body.lastname,
       address      : req.body.address,
       postcode     : req.body.postcode,
       contact      : req.body.contact
    }).save(function(err,doc){
        if(err) res.json(err);
        else    res.send("Success");
    })
});

app.listen(3000);
console.log("Listening on port 3000");