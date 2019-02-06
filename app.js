var express = require("express");
var app = express();
var bodyParser = require("body-parser");

//mongodb test
const mongoose = require('mongoose'); // requiring our package

mongoose.connect('mongodb://localhost/dinner-library-test'); // establishing the connection
mongoose.connection
.once('open', () => console.log('Connection established'))
.on('error', (error) => {
    console.log('Warning : ' + error); 
});

app.use(bodyParser.urlencoded({extended: true}));

//adds .ejs to all route names
app.set("view engine", "ejs");

//SCHEMA SETUP
var recipeSchema = new mongoose.Schema({
    name: String,
    image: String
});

//creates model from Schema to add methods
var Recipe = mongoose.model("Recipe", recipeSchema);

// Recipe.create(
//     {
//         name: "Asian beef ramen noodle",
//         image: "https://www.recipetineats.com/wp-content/uploads/2018/12/Asian-Beef-Noodles_7-650x813.jpg"
//     }, function(err, recipe){
//     if(err){
//         console.log(err);
//     } else {
//         console.log("Newly created recipe: ");
//         console.log(recipe);
//     }
// });

// var recipes = [
//     {
//         name: "Pad Thai",
//         image: "https://www.recipetineats.com/wp-content/uploads/2018/05/Chicken-Pad-Thai_9-landscape-650x501.jpg"
//     },
//     {
//         name: "Asian beef ramen noodle",
//         image: "https://www.recipetineats.com/wp-content/uploads/2018/12/Asian-Beef-Noodles_7-650x813.jpg"
//     },
//     {
//         name: "Cheese muffins",
//         image: "https://www.recipetineats.com/wp-content/uploads/2016/05/Cheesy-Savoury-Muffins_1a.jpg"
//     }
// ]

app.get("/", function(req,res){
    res.render("landing");
});

app.get("/recipes", function(req,res){
    //Get all recipes from DB
    Recipe.find({}, function(err, allRecipes){
        if(err){
            console.log(err);
        } else {
            res.render("recipes", {recipes:allRecipes});
        }
    });
    // res.render("recipes", {recipes:recipes});
});

app.post("/recipes", function(req, res){
    //get data from form and add to recipes array
    var name = req.body.name;
    var image = req.body.image;
    var newRecipe = {name: name, image: image};
    //Create a new recipe and save to DB
    Recipe.create(newRecipe, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/recipes");
        }
    })
});

app.get("/recipes/new", function(req, res){
    res.render("new.ejs");
});

app.listen(3000, process.env.IP, function(){
    console.log("The Dinner Library server has started");
});