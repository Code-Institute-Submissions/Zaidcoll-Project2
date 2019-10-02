/*global $,axios */

const KEY ='f538f37fb7683c00f076bc35ebfcaade'
const URL ='https://api.themoviedb.org/3/search/movie?api_key=' + KEY
const IMG ='https://image.tmdb.org/t/p/w500'

function test(){
    axios.get(URL,{
        params:{
            'query':searcher,
            'primary_release_year':'2018',
            'sort_by':'',
            'with_genres':''
        }
    }).then(function(response){
    console.log(response)
    })
}
$(function(){
    $('#clicker').click(function(){
        let searcher = $('#searcher').val()
        axios.get(URL,{
        params:{
            'query':searcher,
            'primary_release_year':'',
            'sort_by':'',
            'with_genres':''
        }
    }).then(function(response){
    let movies=response.data.results
    console.log(response.data)
    $('#imager1').attr('src',IMG + movies[0].poster_path)
    })
    })
    
    
    
})

