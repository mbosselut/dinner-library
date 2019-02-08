var mongoose = require("mongoose");
var Recipe = require("./models/recipe");
var Comment   = require("./models/comment");

var data = [
    {
        name: "Pad Thai",
        image: "https://www.recipetineats.com/wp-content/uploads/2018/05/Chicken-Pad-Thai_9-landscape-650x501.jpg",
        description: "My new favorite recipe"
    },
    {
        name: "Asian beef ramen noodle",
        image: "https://www.recipetineats.com/wp-content/uploads/2018/12/Asian-Beef-Noodles_7-650x813.jpg",
        description: "Quick and tasty, but high in calories"
    },
    {
        name: "Cheese muffins",
        image: "https://www.recipetineats.com/wp-content/uploads/2016/05/Cheesy-Savoury-Muffins_1a.jpg",
        description: "Good party food!"
    }
]

function seedDB(){
    //Remove all recipes
    Recipe.remove({}, function(err){
         if(err){
             console.log(err);
         }
         console.log("removed recipes!");
         Comment.remove({}, function(err) {
             if(err){
                 console.log(err);
             }
             console.log("removed comments!");
              //add a few recipes
             data.forEach(function(seed){
                 Recipe.create(seed, function(err, recipe){
                     if(err){
                         console.log(err)
                     } else {
                         console.log("added a recipe");
                         //create a comment
                         Comment.create(
                             {
                                 text: "This place is great, but I wish there was internet",
                                 author: "Homer"
                             }, function(err, comment){
                                 if(err){
                                     console.log("OOOOOOOOOOOOOOOOOOOOOOOPS");
                                     console.log(err);
                                 } else {
                                     recipe.comments.push(comment);
                                     recipe.save();
                                     console.log("Created new comment");
                                 }
                             });
                     }
                 });
             });
         });
     }); 
     //add a few comments
 }

// function seedDB(){
//    //Remove all recipes
//    Recipe.remove({}, function(err){
//         if(err){
//             console.log(err);
//         }
//         console.log("removed recipes!");
//         Comment.remove({}, function(err) {
//             if(err){
//                 console.log(err);
//             }
//             console.log("removed comments!");
//              //add a few recipes
//             data.forEach(function(seed){
//                 Recipe.create(seed, function(err, recipe){
//                     if(err){
//                         console.log(err)
//                     } else {
//                         console.log("added a recipe");
//                         //create a comment
//                         Comment.create(
//                             {
//                                 text: "This recipe is great, but I wish there was internet",
//                                 author: "Homer"
//                             }, function(err, comment){
//                                 if(err){
//                                     console.log(err);
//                                 } else {
//                                     recipe.comments.push(comment);
//                                     recipe.save();
//                                     console.log("Created new comment");
//                                 }
//                             });
//                     }
//                 });
//             });
//         });
//     }); 
//     //add a few comments
// }
 
module.exports = seedDB;