const http = require("http");
const port = 3000;
const bodyParser = require('body-parser');
var express = require("express");
var path = require('path');
var app = express();
const router = express.Router();

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.listen(3000);
console.log("Listening on port 3000");