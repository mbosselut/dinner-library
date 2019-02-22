var mongoose = require("mongoose");
var Recipe = require("./models/recipe");
var Comment   = require("./models/comment");

var data = [
    {
        name: "Pad Thai",
        image: "https://www.recipetineats.com/wp-content/uploads/2018/05/Chicken-Pad-Thai_9-landscape-650x501.jpg",
        description: "Cupcake ipsum dolor. Sit amet chupa chups. Lollipop wafer liquorice gummies sweet roll gummies brownie sweet roll gummies. Icing biscuit wafer halvah chocolate. Macaroon toffee dragée muffin cotton candy pastry. Croissant chupa chups cookie chocolate bar. Pastry topping soufflé wafer oat cake. Soufflé donut danish dragée lemon drops. Macaroon cake chocolate bar cotton candy tootsie roll cotton candy toffee gummies. Macaroon gingerbread cookie cake marzipan tiramisu."
    },
    {
        name: "Asian beef ramen noodle",
        image: "https://www.recipetineats.com/wp-content/uploads/2018/12/Asian-Beef-Noodles_7-650x813.jpg",
        description: "Cupcake ipsum dolor. Sit amet chupa chups. Lollipop wafer liquorice gummies sweet roll gummies brownie sweet roll gummies. Icing biscuit wafer halvah chocolate. Macaroon toffee dragée muffin cotton candy pastry. Croissant chupa chups cookie chocolate bar. Pastry topping soufflé wafer oat cake. Soufflé donut danish dragée lemon drops. Macaroon cake chocolate bar cotton candy tootsie roll cotton candy toffee gummies. Macaroon gingerbread cookie cake marzipan tiramisu."
    },
    {
        name: "Cheese muffins",
        image: "https://www.recipetineats.com/wp-content/uploads/2016/05/Cheesy-Savoury-Muffins_1a.jpg",
        description: "Cupcake ipsum dolor sit. Amet marzipan sesame snaps pie tiramisu. Pastry sugar plum cupcake jelly apple pie cake danish chupa chups halvah. Biscuit brownie candy canes topping candy canes tart. Tootsie roll lollipop bear claw tiramisu wafer jelly-o icing cheesecake soufflé. Sweet roll ice cream chocolate bar bonbon brownie toffee. Candy canes dragée jelly muffin powder chupa chups powder marzipan chocolate bar."
    }
]

function seedDB(){
    //Remove all recipes
    Recipe.remove({}, function(err){
        // if(err){
        //      console.log(err);
        //  }
        //  console.log("removed recipes!");
        //  Comment.remove({}, function(err) {
        //      if(err){
        //          console.log(err);
        //      }
        //      console.log("removed comments!");
        //       //add a few recipes
        //      data.forEach(function(seed){
        //          Recipe.create(seed, function(err, recipe){
        //              if(err){
        //                  console.log(err)
        //              } else {
        //                  console.log("added a recipe");
        //                  //create a comment
        //                  Comment.create(
        //                      {
        //                          text: "This place is great, but I wish there was internet",
        //                          author: "Homer"
        //                      }, function(err, comment){
        //                          if(err){
        //                              console.log("OOOOOOOOOOOOOOOOOOOOOOOPS");
        //                              console.log(err);
        //                          } else {
        //                              recipe.comments.push(comment);
        //                              recipe.save();
        //                              console.log("Created new comment");
        //                          }
        //                      });
        //              }
        //          });
        //      });
        //  });
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