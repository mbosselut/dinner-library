var express = require("express");
var router  = express.Router();
var Recipe  = require("../models/recipe");

//INDEX ROUTE - Show all recipes
router.get("/", function(req,res){
    //Get all recipes from DB
    Recipe.find({}, function(err, allRecipes){
        if(err){
            console.log(err);
        } else {
            res.render("recipes/index", {recipes:allRecipes});
        }
    });
    // res.render("recipes", {recipes:recipes});
});

//CREATE ROUTE - Post new recipe to DB
router.post("/", isLoggedIn, function(req, res){
    //get data from form and add to recipes array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newRecipe = {name: name, image: image, description: description, author: author};
    //Create a new recipe and save to DB
    Recipe.create(newRecipe, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            console.log(newRecipe);
            res.redirect("/recipes");
        }
    })
});

//NEW ROUTE - Show form to create new recipe
router.get("/new", isLoggedIn, function(req, res){
    res.render("recipes/new");
});

//SHOW ROUTE - Show info about one recipe
router.get("/:id", function(req, res){
    //find the recipe w/ provided ID
    Recipe.findById(req.params.id).populate("comments").exec(function(err, foundRecipe){
        if(err){
            console.log(err);
        } else {
            res.render("recipes/show", {recipe: foundRecipe})
        }
    });
});

//EDIT ROUTE - showing edit form
router.get("/:id/edit", function(req, res){
    Recipe.findById(req.params.id, function(err, foundRecipe){
        if(err) {
            res.redirect("/recipes");
        } else {
            res.render("recipes/edit", {recipe: foundRecipe});
        }
    });    
})

//UPDATE ROUTE - updating recipe
router.put("/:id", function(req, res){
    //find and update correct recipe
    Recipe.findByIdAndUpdate(req.params.id, req.body.recipe, function(err, updatedRecipe){
        if(err){
            res.redirect("/recipes");
        } else {
            res.redirect("/recipes/" + req.params.id);
        }
    })
    //redirect somewhere
});

//DESTROY RECIPE ROUTE
router.delete("/:id", function(req, res){
    Recipe.findByIdAndDelete(req.params.id, function(err){
        if(err){
            res.redirect("/recipes");
        } else{
            res.redirect("/recipes");
        }
    })
});

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

//exports from this file
module.exports = router;