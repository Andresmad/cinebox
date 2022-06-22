let movies = [];

function start(){
    getDestaques();
    tvshows();
    openMovie();
};



let button = document.getElementById('btnClick');
let div = document.getElementById('list');


let btn = document.querySelector('#btn');
let sidebar = document.querySelector('.sidebar');

function sidebaractive() {
  sidebar.classList.toggle("active");
}


const API_KEY = 'api_key=9d0adda6dbd5cfb05902da3303bc6085';
const BASE_URL =  'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const TV_URL = BASE_URL + '/discover/tv?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500/';
const IMG_TV_URL = 'https://image.tmdb.org/t/p/w500/';


const SEARCH_URL =  BASE_URL + '/search/movie?sort_by=popularity.desc&' + API_KEY;


//Vai buscar API os filmes em destque
function getDestaques() {
    fetch(API_URL, {
        method: 'GET',
    })
    .then(response => response.json())
    .then((data) =>  drawlist(data.results));
}

//Desenha uma lista com os filmes
function drawlist (data) {
    console.log(data);
    let div = document.getElementById('list');
    div.innerHTML = '';
    for (let index = 0; index < 20; index++) {
        movies.push(data[index]);
        div.innerHTML += '<div><img id="my-image" data-id="' + data[index].id + '" class="movie img_style" src="' + IMG_URL + data[index].poster_path +  '" /></div>';
    }
}

//Vai buscar API as séries em destque
function tvshows() {
    fetch(TV_URL, {
        method: 'GET',
    })
    .then(response => response.json())
    .then((data) =>  drawsecondlist(data.results));
}

//Desenha uma lista com as séries
function drawsecondlist(data) {
    console.log(data);
    let div = document.getElementById('secondlist');
    div.innerHTML = '';
    for (let index = 0; index < 20; index++) {
        movies.push(data[index]);
        div.innerHTML += '<div><img data-id="' + data[index].id + '" class="movie img_style" src="' + IMG_TV_URL + data[index].poster_path +  '" /></div>';
    }
}


//Função responsável por abrir os filmes e séries
function openMovie() {
    document.body.addEventListener('click', function(e) {
        if (e.target.classList.contains('movie')) {
            let id = e.target.getAttribute('data-id');
            let movie = movies.find(function(item) {
                return item.id == id;
            });

            if (movie) {
                localStorage.setItem('movieDocument', JSON.stringify(movie));
                window.open('movie.html', '_self');
            } else {
                alert('Não encontrou filme!!');
            }
        }
    }, true);
}




