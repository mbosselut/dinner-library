var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    flash           = require("connect-flash");
    Recipe          = require("./models/recipe"),
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

console.log(process.env.DATABASEURL);
var url = process.env.DATABASEURL || "mongodb://localhost:27017/dinner-library-test";
//avoiding deprecation warning
mongoose.connect(url, { useNewUrlParser: true });

//mongoose.connect('mongodb://localhost:27017/dinner-library-test', {useNewUrlParser: true}); // establishing the connection
//mongoose.connect('mongodb+srv://manonb:manonb@cluster0-nh8iu.mongodb.net/test?retryWrites=true', {useNewUrlParser: true}); // establishing the connection

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
app.use(flash());

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
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    //moving on to the next code
    next();
});

app.use(indexRoutes);
//appends "/recipes" in front of all routes in routes/recipes.js
app.use("/recipes", recipeRoutes);
app.use("/recipes/:id/comments", commentRoutes);

app.listen(process.env.PORT || 3000, process.env.IP, function(){
    console.log("The Dinner Library server has started");
});