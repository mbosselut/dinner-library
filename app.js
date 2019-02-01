var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

//adds .ejs to all route names
app.set("view engine", "ejs");

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

app.get("/", function(req,res){
    res.render("landing");
});

app.get("/recipes", function(req,res){
    //renders the recipes object, first name could be anything, 2nd is the data to pass
    res.render("recipes", {recipes:recipes});
});

app.post("/recipes", function(req, res){
    //get data from form and add to recipes array
    var name = req.body.name;
    var image = req.body.image;
    var newRecipe = {name: name, image: image};
    recipes.push(newRecipe);
    //redirect back to recipes page
    res.redirect("/recipes");
});

app.get("/recipes/new", function(req, res){
    res.render("new.ejs");
});

app.listen(3000, process.env.IP, function(){
    console.log("The Dinner Library server has started");
});