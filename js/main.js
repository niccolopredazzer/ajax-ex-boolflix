

var source = $("#card-template").html();         //clono template
var template = Handlebars.compile(source);
var apiBaseUrl = 'https://api.themoviedb.org/3';
var imageUrl = "https://image.tmdb.org/t/p";


$('#btn-search').click(function() {;                  //richiamo la funzione cerca al click del bottone
    cerca();
});
$('#ricerca-input').keypress(function() {           //tasto enter
    if(event.key == 'Enter') {
        cerca();
    }
});


                    /* funzioni */


function cerca() {
        var input = $('#ricerca-input').val();
        $('#ricerca-input').val('');
        if (input.length > 0) {
             $('#ricerca-input').empty();
            apiRicerca(input, 'movie');
            apiRicerca(input, 'tv');
        } else {
            alert('inserisci qualcosa');
        };
    };

 //funzione per ricerca  //
function apiRicerca(queryRicerca, tipo) {
    $.ajax({
        url: apiBaseUrl + '/search/' + tipo,
        data: {
            api_key: '76b698f438e4ac39c994da7bd8b9076a',
            query: queryRicerca,
            language: 'it-IT'
        },
        method: 'GET',
        success: function (data) {
            var films = data.results;
            creaCard(films, tipo)
        },
        error: function () {

        }
    })
}

//funzione per creare il contenuto della card //



function creaCard(movies, tipo){
    for (var i = 0; i < movies.length; i++) {
        var film = movies[i];
        if (tipo == 'movie') {
               titolo = film.title;
               titoloOriginale = film.original_title;
           } else if (tipo == 'tv') {
               titolo = film.name;
               titoloOriginale = film.original_name;
           }
        var oggettoFilm = {
                poster: imageUrl + "/w342/" + film.poster_path,
                titolo: titolo,
                titoloOriginale: titoloOriginale,
                linguaOriginale: flag(film.original_language),
                voto: votoStelle(film.vote_average),
                votoNumero: Math.ceil(film.vote_average/2)
        };
        var caratteristicheFilm = template(oggettoFilm);        //popolo il template
        $('.cards-container').append(caratteristicheFilm);

    };
};


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
};

// funzione per il poster (incluso il caso in cui non sia disponibile una copertina) //
/*function posterCard(path) {
     if (path !== null) {
         return urlImg + coverBaseSize + path;
     } else {
         return '<img class="poster-film" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flascrucesfilmfest.com%2Fwp-content%2Fuploads%2F2018%2F01%2Fno-poster-available.jpg&f=1&nofb=1">';
     }
 }*/
