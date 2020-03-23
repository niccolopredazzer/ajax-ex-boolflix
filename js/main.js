//milestone 1



var source = $("#card-template").html();         //clono template
var template = Handlebars.compile(source);



$('#btn-search').click(cercaFilm);                  //richiamo la funzione cerca al click del bottone
$('#btn-search').click(cercaSerie);                
$('#ricerca-input').keypress(function() {
    if(event.key == 'Enter') {
        cercaFilm();
        cercaSerie();
    }
});


                    /* funzioni */

 //funzione per ricerca dei titoli dei film //
function cercaFilm() {
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
                var oggettoFilm = {
                        titolo: film.title,
                        titoloOriginale: film.original_title,
                        linguaOriginale: flag(film.original_language),
                        voto: votoStelle(film.vote_average),
                        votoNumero: Math.ceil(film.vote_average/2),
                        poster: posterUrl + "/w342/" + film.poster_path
                };
                var caratteristicheFilm = template(oggettoFilm);        //popolo il template
                $('.cards-container').append(caratteristicheFilm);

            }
        },
        error: function () {

        }
    })
}

// funzione per le serie tv //
function cercaSerie() {
    var apiBaseUrl = 'https://api.themoviedb.org/3';
    var posterUrl = "https://image.tmdb.org/t/p";
    var ricerca = $('#ricerca-input').val();
    $('#ricerca-input').val('');                        //questo mi serve per ripulire l'input
    $.ajax({
        url: apiBaseUrl + '/search/tv',
        data: {
            api_key: '76b698f438e4ac39c994da7bd8b9076a',
            query: ricerca,
            language: 'it-IT'
        },
        method: 'GET',
        success: function (data) {
            var tvShows = data.results;
            $('.cards-container').empty();
            for (var i = 0; i < films.length; i++) {
                var tvShow = tvShows[i];
                var oggettoShow = {
                        titolo: tvshow.title,
                        titoloOriginale: tvshow.original_title,
                        linguaOriginale: flag(tvshow.original_language),
                        voto: votoStelle(tvshow.vote_average),
                        votoNumero: Math.ceil(tvshow.vote_average/2),
                        poster: posterUrl + "/w342/" + tvshow.poster_path
                };
                var caratteristicheTvShow = template(oggettoShow);        //popolo il template
                $('.cards-container').append(caratteristicheTvShow);

            }
        },
        error: function () {

        }
    })
}

// funzione per calcolo delle stelle //

function votoStelle (voto) {
    var votoDimezzato = Math.ceil(voto / 2);              //dimezzo il voto e arrotondo per eccesso
    var stelleSomma = '';                                //definisco una variabile che poi andrò a sommare a se stessa con il +=
    for (var i = 1; i <= 5; i++) {                      //faccio un ciclo per ogni stellina
        if (i > votoDimezzato) {                       //se la i è maggiore del voto allora mi da una stellina vuota
            stelleSomma += '<i class="far fa-star"></i>';
        } else {                                            //altrimenti me ne da una piena
            stelleSomma += '<i class="fas fa-star"></i>';
        }
    }
    return stelleSomma;
}

// funzione per le flags //

function flag (linguaOriginale) {
       var bandiera = '';
       if (linguaOriginale == 'en') {
           bandiera = 'GB';
       } else if (linguaOriginale == 'da') {
           bandiera = 'DK';
       } else if (linguaOriginale == 'ja') {
           bandiera = 'JP';
       } else if (linguaOriginale == 'cs') {
           bandiera = 'CZ';
       } else {
           bandiera = linguaOriginale;
       }
       return '<img src="https://www.countryflags.io/' + bandiera + '/flat/32.png">'
   }
