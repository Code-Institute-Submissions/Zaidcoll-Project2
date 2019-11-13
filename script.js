/*global $,axios */


const FIND = 'https://api.themoviedb.org/3/movie/'
const API_KEY = 'f538f37fb7683c00f076bc35ebfcaade'
const URL = 'https://api.themoviedb.org/3/search/movie?api_key=' +API_KEY
const IMG_poster = 'https://image.tmdb.org/t/p/w500'
const IMG = 'https://image.tmdb.org/t/p/w154'
const SEARCH = 'https://api.themoviedb.org/3/search/multi?api_key=' + API_KEY

$(function() {
    

    $('#clicker').click(function() {
        $('#results').empty()
        let searcher = $('#searcher').val()
        axios.get(SEARCH, {
            params: {
                'query': searcher,
                'primary_release_year': '',
                'sort_by': '',
                'with_genres': ''
            }
        }).then(function(response) {
            let movies = response.data.results
            let output = '';
            $.each(movies,(index,movie)=>{
                if(movie.poster_path){
                    if(movie.original_title){
                    output+=`
                    <div class = 'col-md-3'>
                        <div class="well text-center">
                        <img src = "${IMG + movie.poster_path}">
                        <h5>${movie.original_title}</h5>
                        <a onclick="movieSelected('${movie.id}')" class = "btn btn-primary" href='#'>Movie Details</a>
                        </div>
                    </div>
                `
                    }

                }
                
            })
            $('#results').html(output);
            console.log(movies)

        })
    })

})

function movieSelected(id){
    sessionStorage.setItem('movieId',id)
    window.location = 'movieinfo.html';
    return false;
}

function movieinfo(){
    let movieId = sessionStorage.getItem('movieId');
    
    axios.get(FIND + movieId +'?api_key='+ API_KEY )
    .then((response)=>{
        console.log(response);
        let movie = response.data;
        let output = `
        <div class = "row">
            <div class = "col-md-4>">
                <img src = "${IMG + movie.poster_path}" class = "thumbnail">
            </div>
            <div class ='col-md-8'>
            <h3>${movie.original_title}</h2>
            <ul class = 'list-group'>
            
              <li class="list-group-item"><strong>Genre:</strong> ${movie.genres[0].name}</li>
              <li class="list-group-item"><strong>Revenue:</strong> $ ${movie.revenue}</li>
              <li class="list-group-item"><strong>Ratings:</strong> ${movie.vote_average}</li>
            </ul>
        </div>
        <div class="row">
          <div class="well">
            <h3>Plot</h3>
            ${movie.overview}
            <hr>
            <a href="http://imdb.com/title/${movie.imdb_id}" target="_blank" class="btn btn-primary">View IMDB</a>
            <a href="index.html" class="btn btn-default">Go Back To Search</a>
          </div>
        </div>
        `
        $('#movie_info').html(output);
        
    })
    .catch((err) => {
      console.log(err);
    });
        
    }


//https://api.themoviedb.org/3/movie/343611?api_key={api_key}
//Get the movie details with the '343611' as the movie id

//https://api.themoviedb.org/3/movie/157336?api_key={api_key}&append_to_response=videos,images
//Search for the videos and images using 'append_to_response'

//https://api.themoviedb.org/3/movie/{movie_id}/similar?api_key=<<api_key>>&language=en-US&page=1
//Search for similar movies using 'similar'

//params : sort_by=vote_average.desc / revenue.desc 
//genres : https://api.themoviedb.org/3/genre/movie/list?api_key=<<api_key>>&language=en-US
