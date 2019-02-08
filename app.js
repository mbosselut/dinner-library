var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var Recipe = require("./models/recipe");
var seedDB = require("./seeds");


//mongodb test
const mongoose = require('mongoose'); // requiring our package

mongoose.connect('mongodb://localhost:27017/dinner-library-test', {useNewUrlParser: true}); // establishing the connection
mongoose.connection
.once('open', () => console.log('Connection established'))
.on('error', (error) => {
    console.log('Warning : ' + error); 
});

app.use(bodyParser.urlencoded({extended: true}));

//adds .ejs to all route names
app.set("view engine", "ejs");
seedDB();

app.get("/", function(req,res){
    res.render("landing");
});

//INDEX ROUTE - Show all recipes
app.get("/recipes", function(req,res){
    //Get all recipes from DB
    Recipe.find({}, function(err, allRecipes){
        if(err){
            console.log(err);
        } else {
            res.render("index", {recipes:allRecipes});
        }
    });
    // res.render("recipes", {recipes:recipes});
});

//CREATE ROUTE - Post new recipe to DB
app.post("/recipes", function(req, res){
    //get data from form and add to recipes array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newRecipe = {name: name, image: image, description: description};
    //Create a new recipe and save to DB
    Recipe.create(newRecipe, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/recipes");
        }
    })
});

//NEW ROUTE - Show form to create new recipe
app.get("/recipes/new", function(req, res){
    res.render("new.ejs");
});

//SHOW ROUTE - Show info about one recipe
app.get("/recipes/:id", function(req, res){
    //find the recipe w/ provided ID
    Recipe.findById(req.params.id).populate("comments").exec(function(err, foundRecipe){
        if(err){
            console.log(err);
        } else {
            res.render("show", {recipe: foundRecipe})
        }
    });
});

app.listen(3000, process.env.IP, function(){
    console.log("The Dinner Library server has started");
});