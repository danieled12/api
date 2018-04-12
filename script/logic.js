$(document).ready(function(){
var movie = "batman";

var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=dc6zaTOxFJmzC&limit=10";

  $.get(URL, function(data){
    console.log(data);
  });

});
