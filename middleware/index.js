var Recipe = require("../models/recipe");
var Comment = require("../models/comment");

//All the middleware goes here
var middlewareObj = {};

middlewareObj.checkRecipeOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Recipe.findById(req.params.id, function(err, foundRecipe){
            if(err) {
                res.redirect("/back");
            } else {
                //does user own the recipe? using mongoose method to compare both, because one is an object and the other a string
                if(foundRecipe.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });    
    } else {
        //redirects to previous page
        res.redirect("back");
    }
};


middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err) {
                res.redirect("/back");
            } else {
                //does user own the comment? using mongoose method to compare both, because one is an object and the other a string
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });    
    } else {
        //redirects to previous page
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};


module.exports = middlewareObj;