var mongoose = require("mongoose");

//useless ? var Comment   = require("./models/comment");

//SCHEMA SETUP
var recipeSchema = new mongoose.Schema({
    name: String,
    url: String,
    recipeAuthor: String,
    cookingTime: String,
    calories : Number,
    category: String,
    image: String,
    description: String,
    ingredients: String,
    tags: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
        }
    ]
});


//will bring in the model when we require this file
module.exports = mongoose.model("Recipe", recipeSchema);