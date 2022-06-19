var theUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=ae89202412cb260fbf310ae0d082b66d&language=pt-BR&page=1'
var url_filme = 'https://www.themoviedb.org/movie/'
var posterpath = 'https://image.tmdb.org/t/p/original'
var nome = sessionStorage.getItem("valor_busca");
var url = 'https://api.themoviedb.org/3/search/movie?api_key=ae89202412cb260fbf310ae0d082b66d&language=pt-BR&page=1&include_adult=false&query='

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}



var url_busca = url + nome;

var dados = httpGet(url_busca);

var json_filmes = JSON.parse(dados);

var url_cartaz = "https://api.themoviedb.org/3/movie/now_playing?api_key=ae89202412cb260fbf310ae0d082b66d&language=pt-BR&page=1"

var dados_cartaz = httpGet(url_cartaz);
var json_cartaz = JSON.parse(dados_cartaz);


document.querySelector("h1").innerHTML = "Resultados da busca por " +nome;
function filmes_buscados()
{
    var caixa_filmes = document.querySelectorAll('.col-md-3');
    var i=0;
    if(json_filmes.results.length == 0)
    {
        document.querySelector("h1").innerHTML = "Não foram encontrados resultados para a busca";
        document.querySelector("h1").appendChild(document.createElement("p")); 
        document.querySelector("p").innerHTML = "Mostrando filmes em cartaz"
        mostraFilmes(json_cartaz)
    }   
    else{
        document.querySelector("h1").innerHTML = "Resultados da busca por " +nome;
        mostraFilmes(json_filmes)
    }
 
}

function mostraFilmes()
{
    var caixa_filmes = document.querySelectorAll('.col-md-3');
    var i=0;
    for(caixa of caixa_filmes)
    {       
         caixa.querySelector('#texto').innerHTML = json_filmes.results[i].title;
         caixa.querySelector('a').href = url_filme + json_filmes.results[i].id;
         caixa.querySelector('img').src = posterpath+ json_filmes.results[i].poster_path
         caixa.querySelector("#texto").href = url_filme + json_filmes.results[i].id;

         var p = document.createElement("p");
         caixa.appendChild(p);
         p.innerHTML ='Nota do filme: ' + json_filmes.results[i].vote_average;
         var p = document.createElement("p");
         caixa.appendChild(p);
         p.innerHTML ='Data de lançamento: ' + json_filmes.results[i].release_date;
         i = i+1;
        
    }
}

mostraFilmes();

