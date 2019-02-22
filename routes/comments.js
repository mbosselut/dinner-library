var express = require("express");
var router  = express.Router({mergeParams: true});

//linking the files to avoid 'Recipe doesn't exist'
var Recipe = require("../models/recipe");
//linking the files to avoid 'Comment doesn't exist'
var Comment = require("../models/comment");

//Comments - New
router.get("/recipes/:id/comments/new", isLoggedIn, function(req, res){
    //find recipe by id
    Recipe.findById(req.params.id, function(err, recipe){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {recipe: recipe});
        }
    })
});

//Comment - Create
router.post("/recipes/:id/comments", isLoggedIn, function(req, res){
    //lookup recipe using id
    Recipe.findById(req.params.id, function(err, recipe){
        if(err){
            console.log(err);
            res.redirect("/recipes");
        } else {
            //thanks to formatting comment[text] in the 'new' route, req.body.comment already includes text and author
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    recipe.comments.push(comment);
                    recipe.save();
                    res.redirect("/recipes/" + recipe._id);
                }
            });
        }
    });
})

//Middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

module.exports = router;