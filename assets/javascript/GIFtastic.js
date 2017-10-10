"use strict";

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
      "Reno 911"
      ];
      var giphy;
      var results;
      var i;
      var randImage;
    
      function renderButtons() {

        $("#giphys-view").empty();

        for (var i = 0; i < giphys.length; i++) {

          var b = $("<button class='giphy'>");
          b.addClass("button");
          b.attr("data-name", giphys[i]);
          b.text(giphys[i]);
          $("#giphys-view").append(b);
          $("#new-input").val("");
          $("#new-input").focus();
        }
      }
      
      $("#add-new").on("click", function(event) {
        event.preventDefault();

        giphy = $("#new-input").val().trim();

        if($.inArray(giphy, giphys) !== -1) {
          alert("That button already exists!");
          $("#new-input").empty();
          return;
        } else if(giphy !== "") {
          giphys.push(giphy);
          console.log(giphys);
        }

        renderButtons();
      });

      renderButtons();
      
      $("#giphys-view").on("click", ".giphy", function() { // Attaches event listener function

        $("#gifs-here").empty();

        var searchSubject = $(this).attr("data-name");
        var searchSubjectEdited = searchSubject.replace(/ /g, "+");
        console.log("The subject searched is: " + searchSubjectEdited);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchSubjectEdited + 
                      "&api_key=79nYgjB20sOjRJaXUazd5e3YY1o6DQ5e&rating=pg-13&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })

        .done(function(response) {
          console.log(response);

          results = response.data;

          for (i = 0; i < results.length; i++) {

            console.log(results[i]);

            var gifDiv = $("<div class='gif-container grow shake'>");
            var rating = results[i].rating;
            var p = $("<p class='rating-container'>");
            $(p).text("rated " + rating);
            var actualImage = $("<img class='gif'>");
            actualImage.attr("src", results[i].images.fixed_height_still.url);
            actualImage.attr({"data-still" : results[i].images.fixed_height_still.url});
            actualImage.attr({"data-animate" : results[i].images.fixed_height.url});
            actualImage.attr({"data-state" : "still"});
            actualImage.attr("alt", "random image");
            actualImage.attr("id", "image-" + i);
            $(gifDiv).append(p);
            $(gifDiv).append(actualImage);
            $("#gifs-here").prepend(gifDiv);
          }    
      });
    });

      $("#gifs-here").on("click", ".gif", function () {
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

      var backgroundArray = [
      "url(assets/images/colorful_pattern_1.jpeg)",
      "url(assets/images/pink_1_pattern.png)", 
      "url(assets/images/purple_1_pattern.png)", 
      "url(assets/images/colorful_pattern_2.png)",
      "url(assets/images/pink_4_pattern.png)",
      "url(assets/images/green_3_pattern.png)",
      "url(assets/images/colorful_pattern_3.jpeg)",
      "url(assets/images/yellow_2_pattern.png)",
      "url(assets/images/blue_3_pattern.png)",
      "url(assets/images/colorful_pattern_4.jpg)",
      "url(assets/images/pink_2_pattern.png)", 
      "url(assets/images/red_1_pattern.png)",
      "url(assets/images/colorful_pattern_5.jpg)", 
      "url(assets/images/blue_2_pattern.png)",     
      "url(assets/images/green_2_pattern.png)",
      "url(assets/images/colorful_pattern_6.jpeg)",
      "url(assets/images/yellow_1_pattern.png)",
      "url(assets/images/blue_1_pattern.png)",
      "url(assets/images/colorful_pattern_7.jpg)",
      "url(assets/images/orange_1_pattern.png)", 
      "url(assets/images/red_3_pattern.png)", 
      "url(assets/images/colorful_pattern_8.jpg)",
      "url(assets/images/red_2_pattern.png)",
      "url(assets/images/pink_3_pattern.png)",
      "url(assets/images/colorful_pattern_9.jpeg)",
      "url(assets/images/green_1_pattern.png)", 
      "url(assets/images/orange_2_pattern.png)"
      ];
    var backgroundIndex = 0;

    var rotateBackground = function(){
    $(".rating-container").css("background", backgroundArray[backgroundIndex]);
    $(".gif-container").css("background", backgroundArray[backgroundIndex + 1]);
    $(".gif").css("background", backgroundArray[backgroundIndex + 2]);
      backgroundIndex++;
      if (backgroundIndex >= backgroundArray.length){
          backgroundIndex = 0;
      }
}

$(document).ready( function(){
   setInterval(rotateBackground, 5000);
});