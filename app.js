//endpoint
var yTube = 'https://www.googleapis.com/youtube/v3/search';

//state functions

const appState = {
  results: [],
  nextPage: " ",
  prevPage: " "
}

//AJAX function
function getInfo(search){
  var query = {
    q: search,
    part: 'snippet',
    key:'AIzaSyDLOpOm5iorBjZs6qrTcu_80-sRwAC_JdU'
  }
  $.getJSON(yTube, query, function(data){
    if(data.prevPageToken){
      appState.prevPage = data.prevPageToken;
      renderPrev(appState, $('#pageTokenPrev'));
    }
      appState.nextPage = data.nextPageToken;
      setResults(appState,data.items);
      getNextPage(appState, data.nextPageToken);
      render(appState, $('.js-results'));
      renderNext(appState, $('#pageTokenNext'));
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

function Redirect(url){
  window.location=url;
}

function getNextPage(state, nextPage){
  state.nextPage = nextPage;
}

//render functions
function render(state, element){
  let html = '';
  state.results.map(result => {
    html += `<li> ${result.snippet.title} </li>
              <li><img src='${result.snippet.thumbnails.medium.url}' onclick="Redirect('https://www.youtube.com/watch?v=${result.id.videoId}')"></li>`;
    console.log(result.snippet.thumbnails.default.url);
  })
  element.html(html);
}

function renderPrev(state, element){
    let html = '';
    html += `<button id="tokenPrev" class="js-next" type="submit">Prev Page</button>`
  element.html(html);
}

function renderNext(state, element){
    let html = '';
    html += `<button id="tokenNext" class="js-next" type="submit">Next Page</button>`
  element.html(html);
}

//event listeners
function addListeners(){

  $('.js-search-page').submit(function(event){
    event.preventDefault();
    let topic = $(event.currentTarget).find('.js-topic').val();
    getInfo(topic);
  })

//Fix these listeners
  $('#tokenPrev').submit(function(event){
    event.preventDefault();
    let move = $(event.currentTarget).find('#tokenPrev').val();
    getInfo(move);
  })

  $('#tokenNext').submit(function(event){
    event.preventDefault();
    //let move = $('#pageTokenPrev').find('#tokenNext').val();
    consol.log('a', move);
    //getInfo(move);
  })

}

$(function (){


  addListeners();

});
