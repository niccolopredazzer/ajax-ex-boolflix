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

 //funzione per ricerca dei titoli dei film
function cerca() {
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
                        linguaOriginale: film.original_language,
                        voto: votoStelle(film.vote_average),
                        //votoNumero: Math.ceil(film.vote_average/2),
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

//funzione per calcolo delle stelle

function votoStelle (voto) {
    var votoDimezzato = Math.ceil(voto / 2);              //dimezzo il voto e arrotondo per eccesso
    var stelleSomma = "";                                //definisco una variabile che poi andrò a sommare a se stessa con il +=
    for (var i = 1; i <= 5; i++) {                      //faccio un ciclo per ogni stellina
        if (i <= votoDimezzato) {                      //se la i è minore o uguale al voto/2 allora avrà una stellina piena
            stelleSomma += '<i class="fas fa-star"></i>';
        } else {
            stelleSomma += '<i class="far fa-star"></i>';
        }
    }
    return stelleSomma;
}
