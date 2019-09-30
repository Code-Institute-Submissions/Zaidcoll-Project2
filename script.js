/*global $,axios */

const KEY ='f538f37fb7683c00f076bc35ebfcaade'
const URL ='https://api.themoviedb.org/3/movie/'

function test(){
    axios.get(URL + '550?api_key=' + KEY).then(function(response){
    console.log(response)
    })
}

test()
$(function(){
  
})
