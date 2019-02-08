var express = require("express");
var app = express();
var bodyParser = require("body-parser");

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

//SCHEMA SETUP
var recipeSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

//creates model from Schema to add methods
var Recipe = mongoose.model("Recipe", recipeSchema);

// Recipe.create(
//     {
//         name: "Asian beef ramen noodle",
//         image: "https://www.recipetineats.com/wp-content/uploads/2018/12/Asian-Beef-Noodles_7-650x813.jpg",
//         description: "This is very quick and quite tasty, but high in calories"
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
    Recipe.findById(req.params.id, function(err, foundRecipe){
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