//milestone 1

var apiBaseUrl = 'https://api.themoviedb.org/3';

var source = $("#card-template").html();
var template = Handlebars.compile(source);

$('#btn-search').click(function(){
    var ricerca = $('#ricerca-input').val();
    $('#ricerca-input').val('');
    $.ajax({
        url: apiBaseUrl + '/search/movie',
        data: {
            api_key: 'ea3119af8e41f04cb2df309f65ad9d74',
            query: 'ricerca',
            language: 'it-IT'
        },
        method: 'GET',
        success: function (data) {
            var films = data.results;
            for (var i = 0; i < films.length; i++) {
                var film = films[i];
                console.log(film);
                var oggettoFilm = {
                        titolo: film.title,
                        titoloOriginale: film.original_title,
                        lingua: film.original_language,
                        voto: film.vote_average
                };
                var caratteristicheFilm = template(oggettoFilm);
                $('.cards-container').append(caratteristicheFilm);

            }


        },
        error: function () {
            alert('errore');
        }
    })

});
