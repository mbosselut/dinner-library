var express = require("express");
var router  = express.Router({mergeParams: true});
var middleware = require("../middleware");

//linking the files to avoid 'Recipe doesn't exist'
var Recipe = require("../models/recipe");
//linking the files to avoid 'Comment doesn't exist'
var Comment = require("../models/comment");

//Comments - New
router.get("/new", middleware.isLoggedIn, function(req, res){
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
router.post("/", middleware.isLoggedIn, function(req, res){
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
                    //add  username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save()
                    //save comment
                    recipe.comments.push(comment);
                    recipe.save();
                    console.log(comment);
                    res.redirect("/recipes/" + recipe._id);
                }
            });
        }
    });
})

//COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else {
            //defines recipe_id and comment so they can be used in views/comments/edit.ejs
            res.render("comments/edit", {recipe_id: req.params.id, comment: foundComment});
        }
    });
});

//COMMENT UPDATE ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    //findByIdAndUpdate takes 3 args : data to change, data to replace it with, and callback
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/recipes/" + req.params.id);
        }
    });
});

//COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/recipes/" + req.params.id);
        }
    })
})

//Middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

// function checkCommentOwnership(req, res, next){
//     if(req.isAuthenticated()){
//         Comment.findById(req.params.comment_id, function(err, foundComment){
//             if(err) {
//                 res.redirect("/back");
//             } else {
//                 //does user own the comment? using mongoose method to compare both, because one is an object and the other a string
//                 if(foundComment.author.id.equals(req.user._id)){
//                     next();
//                 } else {
//                     res.redirect("back");
//                 }
//             }
//         });    
//     } else {
//         //redirects to previous page
//         res.redirect("back");
//     }
// };

module.exports = router;