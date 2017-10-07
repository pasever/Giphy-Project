
var userKey = "NwOEFoRmGeMy8WuTuMbyONhoM6zzspon";
var initButtons = ["Gladiator", "Terminator", "The Mask", "Dogs", "Cats", "Elephants", "Seinfeld", "Friends", "Frasier", "Everybody Loves Raymond"];

$("#dropdowns").on("click", ".alert-info", function () {
    //empty the previous page 
    $("#gifsHolder").empty();

    var criteria = $(this).attr("data-name");
    if (!criteria) {
        return;
    }
    //http://api.giphy.com/v1/gifs/search?q=kramer&api_key=NwOEFoRmGeMy8WuTuMbyONhoM6zzspon&limit=20
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            criteria + "&api_key=" + userKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
            // After data comes back from the request
            .done(function (response) {

                console.log(queryURL);
                console.log(response);

                // storing the data from the AJAX request in the results variable
                var results = response.data;

                // Looping through each result item
                for (var i = 0; i < results.length; i++) {

                    // Creating and storing a div tag
                    var buttonDiv = $("<div>");
                    buttonDiv.addClass("col-md-4");

                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").text("Rating: " + results[i].rating);

                    // Creating and storing an image tag
                    var returnImage = $("<img>");
                    //Adding class 
                    returnImage.addClass("img-responsive");

                    //Pushing the results into the new function
                    attachListener(returnImage, results[i]);

                    // Appending the paragraph and image tag to the animalDiv
                    buttonDiv.append(p);
                    buttonDiv.append(returnImage);

                    // Pushes the gifs into the page 
                    $("#gifsHolder").prepend(buttonDiv);
                }
            });
});

function attachListener(image, result) {

    var still = result.images.original_still.url;
    var moving = result.images.fixed_height.url;

    image.attr("src", moving);

    image.on("click", function (event) {

        if ($(this).attr("data-type") === "still") {
            $(this).attr("src", moving);
            $(this).attr("data-type", "moving");
        } else {
            $(this).attr("src", still);
            $(this).attr("data-type", "still");
        }

        console.log(result);
    });

}

function generateButtons() {

    $("#dropdowns").empty();
    $("#gifsHolder").empty();

    // Looping through the array
    for (var i = 0; i < initButtons.length; i++) {

        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");

        // Adding a class of movie to our button
        a.addClass("btn btn-secondary dropdown-item alert-info");
        // Adding a data-attribute 

        //a.attr("data-name", movies[i]);
        a.attr("data-name", initButtons[i]);

        // Providing the initial button text
        a.text(initButtons[i]);

        // Adding the button to the buttons-view div
        $("#dropdowns").append(a);
    }
}

$("#searchButton").on("click", function (event) {
    event.preventDefault();

    var searchValue = $("#newSearchValue").val().trim();
    initButtons.push(searchValue);
    generateButtons();
});

generateButtons();

//    $(".search").on("click", function search(criteria) {
//        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + criteria + "&api_key=" + userKey;
//        criteria.preventDefault();
//        console.log(images);
//        
//        
//       //http://api.giphy.com/v1/gifs/search?q=kramer&api_key=NwOEFoRmGeMy8WuTuMbyONhoM6zzspon&limit=20
//
//        $.ajax(
//                {   
//                    url: queryURL,
//                    success: function (response) {
//                        console.log(response.data);
//                        console.log(response.data[0].images.downsized);
//                        //console.log("http://api.giphy.com/v1/gifs/search?q=kramer&api_key=NwOEFoRmGeMy8WuTuMbyONhoM6zzspon&limit=20");
//                        
//                    }});
//
//
//    });
//    

//// Generic function for capturing the movie name from the data-attribute
//function buttonName() {
//
//    var x = $("button").attr("data-name");
//    console.log(x);
//
//}
//

//        