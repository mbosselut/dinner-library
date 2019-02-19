var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var Recipe = require("./models/recipe");
var seedDB = require("./seeds");
var Comment = require("./models/comment");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/user");

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
//serving the public directory
app.use(express.static(__dirname + "/public"));

seedDB();

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again; Rusty is the cutest",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
            res.render("recipes/index", {recipes:allRecipes});
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
    res.render("recipes/new");
});

//SHOW ROUTE - Show info about one recipe
app.get("/recipes/:id", function(req, res){
    //find the recipe w/ provided ID
    Recipe.findById(req.params.id).populate("comments").exec(function(err, foundRecipe){
        if(err){
            console.log(err);
        } else {
            res.render("recipes/show", {recipe: foundRecipe})
        }
    });
});

// ==================================
// COMMENTS ROUTES
// ==================================
app.get("/recipes/:id/comments/new", function(req, res){
    //find recipe by id
    Recipe.findById(req.params.id, function(err, recipe){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {recipe: recipe});
        }
    })
});

app.post("/recipes/:id/comments", function(req, res){
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

// ========================
// AUTH ROUTES
// ========================

//show register form
app.get("/register", function(req, res){
    res.render("register");
});

//called when form under /register.ejs is submitted, handles signup logic
app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/recipes");
        });
    });
});

//show login form
app.get("/login", function(req, res){
    res.render("login");
});

app.listen(3000, process.env.IP, function(){
    console.log("The Dinner Library server has started");
});