//endpoint
var yTube = 'https://www.googleapis.com/youtube/v3/search';

//state functions

const appState = {
  raw_results: []
}

//AJAX function
function getInfo(search){
  var query = {
    q: search,
    part: 'snippet',
    key:'AIzaSyDLOpOm5iorBjZs6qrTcu_80-sRwAC_JdU',
  }
  $.getJSON(yTube, query, function(data){
      setResults(appState,data.items);
      //console.log(data);
      render(appState, $('.js-results'));
  });
}
//Tempate for how it should work
// getInfo('cat', function(response){
//   setResults(appState, response.items);
//   console.log(appState);
//   render(appState, $('ul.js-results'));
// });

//mod functions
function setResults(state, results){
  state.results = results;
}

//render functions
function render(state, element){
  let html = '';
  state.results.map(result => {
    html += `<li><img src='${result.snippet.thumbnails.default.url}' ></li>`;
    console.log(result.snippet.thumbnails.default.url);
  })
  element.html(html);
}

//event listeners
function addListeners(){

  $('.js-search-page').submit(function(event){
    event.preventDefault();
    let topic = $(event.currentTarget).find('.js-topic').val();
    getInfo(topic);
  })
}

$(function (){

  addListeners();

});
