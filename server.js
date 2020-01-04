var express = require("express");
var http = require("http");

//init express app
app = express();

app.use(express.static("static"));

app.get("/", function (req,res){
    res.send("Hello world");
})

const port = 3000;
app.listen(port, function(){
    console.log("Listening on port " + port);
})