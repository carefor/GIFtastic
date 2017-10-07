"use strict";

     
      // Initial array of buttons
      var giphys = [
      "The Office", 
      "Parks and Recreation", 
      "30 Rock", 
      "Arrested Development",
      "Seinfeld",
      "Community",
      "Adventure Time",
      "Family Guy",
      "Flight of the Conchords",
      "Da Ali G Show",
      "Summer Heights High",
      "SNL",
      "The Unbreakable Kimmy Schmidt",
      ];
      var giphy;
      var results;
      var i;
      var randImage;
    
    
      // Function for displaying button data
      function renderButtons() {

        // Deleting the  buttons prior to adding new  buttons
        // (this is necessary otherwise we will have repeat buttons)
        $("#giphys-view").empty();

        // Looping through the array of buttons
        for (var i = 0; i < giphys.length; i++) {

          // Then dynamically generating buttons for each butotn in the array.
          // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
          var b = $("<button class='giphy'>");
          // Adding a data-attribute with a value of the button at index i
          b.attr("data-name", giphys[i]);
          // Providing the button's text with a value of the button at index i
          b.text(giphys[i]);
          // Adding the button to the HTML
          $("#giphys-view").append(b);
          $("#new-input").val("");
          $("#new-input").focus();
        }

      }

      // This function handles events where one button is clicked
      $("#add-new").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();

        // This line will grab the text from the input box
        giphy = $("#new-input").val().trim();

        // The button from the textbox is then added to our array

        if($.inArray(giphy, giphys) !== -1) {
          alert("That button already exists!");
          $("#new-input").val("");
          return;
        } else if(giphy !== "") {
          giphys.push(giphy);
          console.log(giphys);
        }
        

        // calling renderButtons which handles the processing of our button array
        renderButtons();
      });

      // Calling the renderButtons function at least once to display the initial list of buttons
      renderButtons();
      

      // const delegatedTarget = document.getElementById("giphys-view");

      // delegatedTarget.onclick = function(event) { 
      //   let targetButton = event.target.closest(".giphy"); 
      //     if(!targetButton) return;
      //     if(!delegatedTarget.contains(targetButton)) return; 

      // console.log("event.target: " + event.target);
      // console.log("event.currentTarget: " + event.currentTarget); 

      $(".giphy").on("click", function() { // Attaches event listener function

          $("#gifsHere").empty();

        var searchSubject = $(this).attr("data-name");

        // removing white space between two-word strings, replacing with a "+"
        var searchSubjectEdited = searchSubject.replace(/ /g, "+");
        console.log("The subject searched is: " + searchSubjectEdited);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchSubjectEdited + 
                      "&api_key=79nYgjB20sOjRJaXUazd5e3YY1o6DQ5e&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })

     // when the call is complete the response will be pulled
        .done(function(response) {
          console.log(response);

          results = response.data;

          for (i = 0; i < results.length; i++) {

            console.log(results[i]);

            var imgDiv = $("<div class='gif-container'>");
            var rating = results[i].rating;
            var p = $("<p class='rating-container'>");
            $(p).text("The rating is: " + rating);
            var actualImage = $("<img class='gif'>");
            actualImage.attr("src", results[i].images.fixed_height_still.url);
            actualImage.attr({"data-still" : results[i].images.fixed_height_still.url});
            actualImage.attr({"data-animate" : results[i].images.fixed_height.url});
            actualImage.attr({"data-state" : "still"});
            actualImage.attr("alt", "random image");
            actualImage.attr("id", "image-" + i);
            $(imgDiv).append(p);
            $(imgDiv).append(actualImage);

            if (rating == "g" || "pg" || "pg-13" || "y"){
              $("#gifs-here").prepend(imgDiv);
            }
            
          }    
      });
    });

      $(".gif").on("click", function () {
        console.log("clicked");
        var state = $(this).attr("data-state");
          
                
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
          