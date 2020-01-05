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

var loginSchema = new mongoose.Schema({
    email    :  String,
    pword :  String
});

var login = mongoose.model('logins', loginSchema);

var appSchema = new mongoose.Schema({
    clientname      :   String,
    appointmentType :   String,
    appointmentOther:   String,
    date            :   Date,
    location        :   String,
    notes           :   String
});

var appointment = mongoose.model('appointments', appSchema);

app.get('/view', function(req,res){
    user.find({}).then(user => res.json(JSON.stringify(user)))
})

app.get('/viewapps', function(req,res){
    appointment.find({}).then(appointment => res.json(JSON.stringify(appointment)))
})

app.post('/loginuser', function(req,res){
    var email = req.body.email;
    var pword = req.body.pword;

    if(email == "admin" && pword == "password"){
        res.redirect('/admindashboard.html');
    } else {
    login.findOne({email: email, pword: pword}, function(err, user) {
        if(err) {
            console.log(err);
            return res.status(500).send();
        }

        if(!user){
            return res.status(404).send();
        }

        res.redirect('/clientdashboard.html');
    });
}});

app.post('/insert-app', function(req,res){
    new appointment({
        clientname      :   req.body.clientName,
        appointmentType :   req.body.appointmentType,
        appointmentOther:   req.body.appointmentOther,
        date            :   req.body.date,
        location        :   req.body.location,
        notes           :   req.body.notes
    }).save(function(err,doc){
        if(err) res.json(err);
        else    res.send("Success");
    });
});

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
    new login({
        email   :   req.body.email,
        pword   :   req.body.pword
    }).save(function(err,doc){
        if(err) res.json(err);
        else    console.log("success");
    })
});

app.listen(3000);
console.log("Listening on port 3000");