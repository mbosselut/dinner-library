var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");

//Root route
router.get("/", function(req,res){
    Recipe.find({}, function(err, allRecipes){
        if(err){
            console.log(err);
        } else {
            res.render("recipes/index", {recipes:allRecipes});
        }
    });
});

//show register form
router.get("/register", function(req, res){
    res.render("register");
});

//called when form under /register.ejs is submitted, handles signup logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to our Dinner library " + user.username);
            res.redirect("/recipes");
        });
    });
});

//show login form
router.get("/login", function(req, res){
    res.render("login");
});

//handling login logic : app.post('login', middleware, callback)
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/recipes",
        failureRedirect: "/login"
    }),
    function(req, res){
    
});

// logout route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out");
    res.redirect("/recipes");
});

module.exports = router;