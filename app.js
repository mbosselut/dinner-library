var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    Recipe          = require("./models/recipe"),
    seedDB          = require("./seeds"),
    Comment         = require("./models/comment"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    User            = require("./models/user");

//Requiring routes
var recipeRoutes    = require("./routes/recipes"),
    commentRoutes   = require("./routes/comments"),
    indexRoutes     = require("./routes/index");

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
app.use(methodOverride("_method"));

// seed database seedDB();

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

//adding middleware to avoid passing currentUser:req.user manually in each route
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    //moving on to the next code
    next();
});

app.use(indexRoutes);
//appends "/recipes" in front of all routes in routes/recipes.js
app.use("/recipes", recipeRoutes);
app.use(commentRoutes);

app.listen(3000, process.env.IP, function(){
    console.log("The Dinner Library server has started");
});