$(document).ready(function (){

	function search() {

		var searchText = $('#search').val().toLowerCase();
		var movieHTML = "";
		var movieModal = "";

		$.ajax({
			url: 'http://www.omdbapi.com/?s=' + searchText + '&r=json&apikey=7472ba75',
			method: 'GET',
			dataType: 'json',
			success: function(data) {
				console.log(data);
					if (data.Response === "True") {
						$.each(data.Search, function(index, movie) {
								movieHTML += '<li id="' + movie.imdbID + '"><div class="poster-wrap">';
									if (movie.Poster != "N/A") {
										movieHTML += '<a class="movie-poster" href="#myModal" data-toggle="modal"' + movie.imdbID + '"><img src="' + movie.Poster + '"></a>';
									} else {
										movieHTML += "<i class='material-icons poster-placeholder'>crop_original</i>";
									}
								movieHTML += '</div>';
								movieHTML += '<span class="movie-title">' + movie.Title + '</span>';
								movieHTML += '<span class="movie-year">' + movie.Year + '</span></li>';
						});
					}


			$('.movie-list').html(movieHTML);
			$('.content_movies').append(movieModal);

				$('li').click(function() {
					var movieModal = "";
					event.preventDefault();
					var movieId = $(this).attr('id');
					$.ajax({
						url: 'http://www.omdbapi.com/?t=' +  movieId + '&r=json&apikey=7472ba75',
						method: 'GET',
						dataType: 'json',
						success: function(data) {
							console.log(movieId);
								movieModal += '<div id ="myModal" class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title">' + data.Title + ' (' + data.Year + ')' + '</h4></div>';
								movieModal += '<div class="modal-body">' + '<img src="' + data.Poster + '"><br><br>IMDB Rating: ' + data.imdbRating + '<br><br>Plot Synopsis:<br>' + data.Plot + '</div>';
								movieModal += '<div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button><a href="http://www.imdb.com/title/' + data.imdbID +'" target="_blank"></a></div></div></div>';
						$('.modal.fade#' + movieId).html(movieModal).modal('show');
						$('.modal.fade#' + movieId).on('hidden.bs.modal', function (e) {
							$('.modal-backdrop.in').remove();
						});

						}
					});
				});

			},
		});
	}
	var delay = (function(){
	  var timer = 0;
	  return function(callback, ms){
	    clearTimeout (timer);
	    timer = setTimeout(callback, ms);
	  };
	})();

	$('input').keyup(function(){
		delay(function(){
			search();
		}, 500);
	});
});
