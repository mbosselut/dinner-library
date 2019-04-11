var express = require("express");
var router  = express.Router();
var Recipe  = require("../models/recipe");
var Comment = require("../models/comment");
//if you require a directory and no file, it automatically requires 'index.js'
var middleware = require("../middleware");


router.get("/raw", (req, res) => {
    Recipe.find({}, function(err, allRecipes){
        if(err){
            console.log(err);
        } else {
            console.log(allRecipes);
            res.json(allRecipes);
        }
    });
});

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
router.post("/", middleware.isLoggedIn, function(req, res){
    //get data from form and add to recipes array
    var name = req.body.name;
    var category = req.body.category;
    var url = req.body.url;
    var recipeAuthor = req.body.recipeAuthor;
    var image = req.body.image;
    var cookingTime = req.body.cookingTime;
    var calories = req.body.calories;
    var ingredients = req.body.ingredients;
    // ingredients = ingredients.split(",");
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newRecipe = {name: name, category: category, url: url, recipeAuthor: recipeAuthor, image: image, cookingTime: cookingTime, calories: calories, description: description, author: author, ingredients: ingredients};
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
router.get("/new", middleware.isLoggedIn, function(req, res){
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
router.get("/:id/edit", middleware.isLoggedIn, middleware.checkRecipeOwnership, function(req, res){
    Recipe.findById(req.params.id, function(err, foundRecipe){
        req.flash("error", "Recipe not found");
        res.render("recipes/edit", {recipe: foundRecipe});
    });
});

//UPDATE ROUTE - updating recipe
router.put("/:id", middleware.checkRecipeOwnership, function(req, res){
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
router.delete("/:id", middleware.checkRecipeOwnership, function(req, res){
    Recipe.findById(req.params.id, function(err, recipe){
        Comment.remove({
            "_id": {
                $in: recipe.comments
            } 
        }, function(err){
            if(err){
                console.log("here's your error " + err);
            } else {
                recipe.remove();
                res.redirect("/recipes");
            }
        })

    })
});

//exports from this file
module.exports = router;