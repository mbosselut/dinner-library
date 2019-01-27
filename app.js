var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req,res){
    res.render("landing");
});

app.listen(3000, process.env.IP, function(){
    console.log("The Dinner Library server has started");
});