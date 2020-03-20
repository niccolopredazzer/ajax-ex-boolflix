//milestone 1



var source = $("#card-template").html();         //clono template
var template = Handlebars.compile(source);

$('#btn-search').click(cerca);                  //richiamo la funzione cerca al click del bottone
$('#ricerca-input').keypress(function() {
    if(event.key == 'Enter') {
        cerca();
    }
});


/* funzioni */


function cerca() {                                       //funzione per ricerca dei titoli dei film
    var apiBaseUrl = 'https://api.themoviedb.org/3';
    var posterUrl = "https://image.tmdb.org/t/p";          
    var ricerca = $('#ricerca-input').val();
    $('#ricerca-input').val('');                        //questo mi serve per ripulire l'input
    $.ajax({
        url: apiBaseUrl + '/search/movie',
        data: {
            api_key: '76b698f438e4ac39c994da7bd8b9076a',
            query: ricerca,
            language: 'it-IT'
        },
        method: 'GET',
        success: function (data) {
            var films = data.results;
            $('.cards-container').empty();
            for (var i = 0; i < films.length; i++) {
                var film = films[i];
                console.log(film);
                var oggettoFilm = {
                        titolo: film.title,
                        titoloOriginale: film.original_title,
                        linguaOriginale: film.original_language,
                        voto: film.vote_average,
                        poster: posterUrl + "/w342/" + film.poster_path
                };
                var caratteristicheFilm = template(oggettoFilm);        //popolo il template
                $('.cards-container').append(caratteristicheFilm);

            }
        },
        error: function () {
            alert('errore');
        }
    })
}
