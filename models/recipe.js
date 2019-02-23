var mongoose = require("mongoose");

//useless ? var Comment   = require("./models/comment");

//SCHEMA SETUP
var recipeSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
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