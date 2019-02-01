var express = require("express");
var app = express();



//adds .ejs to all route names
app.set("view engine", "ejs");

app.get("/", function(req,res){
    res.render("landing");
});

app.get("/recipes", function(req,res){
    var recipes = [
        {
            name: "Pad Thai",
            image: "https://www.recipetineats.com/wp-content/uploads/2018/05/Chicken-Pad-Thai_9-landscape-650x501.jpg"
        },
        {
            name: "Asian beef ramen noodle",
            image: "https://www.recipetineats.com/wp-content/uploads/2018/12/Asian-Beef-Noodles_7-650x813.jpg"
        },
        {
            name: "Cheese muffins",
            image: "https://www.recipetineats.com/wp-content/uploads/2016/05/Cheesy-Savoury-Muffins_1a.jpg"
        }
    ]
    //renders the recipes object, first name could be anything, 2nd is the data to pass
    res.render("recipes", {recipes:recipes});
})

app.listen(3000, process.env.IP, function(){
    console.log("The Dinner Library server has started");
});