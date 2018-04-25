$(document).ready(function (){

	function search() {


		var searchTerm = $('#search').val().toLowerCase();
		var movieHTML = "";
		var movieModal = "";

		$.ajax({
			url: 'http://www.omdbapi.com/?s=' + searchTerm + '&r=json&apikey=7472ba75' + '&plot=full&r=json',
			method: 'GET',
			dataType: 'json',
			success: function(data) {
				console.log(data);
					if (data.Response === "True") {
						$.each(data.Search, function(index, movie) {
								movieHTML += '<li id="' + movie.imdbID + '"><div class="poster-wrap">';
									if (movie.Poster != "N/A") {
										movieHTML += '<a class="movie-poster" href="#" data-toggle="modal" data-target="#' + movie.imdbID + '"><img src="' + movie.Poster + '"></a>';
									} else {
										movieHTML += "<i class='material-icons poster-placeholder'>crop_original</i>";
									}
								movieHTML += '</div>';
								movieHTML += '<span class="movie-title">' + movie.Title + '</span>';
								movieHTML += '<span class="movie-year">' + movie.Year + '</span></li>';

								movieModal += '<div class="modal fade" tabindex="-1" role="dialog" id="' + movie.imdbID + '"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title">' + movie.Title + ' (' + movie.Year + ')' + '</h4></div>';
								movieModal += '<div class="modal-body">' + '<img src="' + movie.Poster + '"><br><br>IMDB Rating: ' + movie.imdbRating + '<br><br>Plot Synopsis:<br>' + movie.Plot + '</div>';
								movieModal += '<div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button><a href="http://www.imdb.com/title/' + movie.imdbID +'" target="_blank"><button type="button" class="btn btn-primary">Link to IMDB</button></a></div></div></div></div>';
						});
					}


			$('.movie-list').html(movieHTML);
			$('.main-content').append(movieModal);

				$('li').click(function() {
					var movieModal = "";
					event.preventDefault();
					var movieId = $(this).attr('id');
					$.ajax({
						url: 'http://www.omdbapi.com/?i=' +  movieId + '&r=json&apikey=7472ba75'+ '&plot=full&r=json',
						method: 'GET',
						dataType: 'json',
						success: function(data) {
							console.log(movieId);
								movieModal += '<div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title">' + data.Title + ' (' + data.Year + ')' + '</h4></div>';
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
