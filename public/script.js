var testButton = document.getElementById("test-button");
var recipeList = document.getElementsByClassName("recipe-show");
var recipeThumbnails = document.getElementsByClassName('recipe-card');
document.getElementById("test-case").innerHTML = "Hello World!";


testButton.addEventListener("click", function(){
    //checking recipes one by one in reverse order and deleting the non-matching ones
    for(var i = recipeThumbnails.length - 1; i >= 0; i--){
        if(recipeThumbnails[i].childNodes[3].textContent.toString().indexOf("Gnocchi") === -1){
            console.log("I will delete: " + recipeThumbnails[i].childNodes[3].innerHTML);
            recipeThumbnails[i].parentNode.removeChild(recipeThumbnails[i]);  
        };
    };
});




