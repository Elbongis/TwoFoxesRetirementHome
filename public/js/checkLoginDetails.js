import { response } from "express";

function getLogin(){
var username;
var password;
username = document.loginform.email.value;
password = document.loginform.pword.value;
var location = '';
if (username=='admin' && password=='password'){
    response.redirect("./homepage.html");
}
else{
    alert("Incorrect login!");
}
}
