//endpoint
var yTube = 'https://www.googleapis.com/youtube/v3/search';

//state functions

const appState = {
  results: [],
  nextPage: " ",
  prevPage: " ",
  q: " "
}

//let nextPageToken = " ";

//AJAX function
function getInfo(search, page, searchString){
  if(search === "") {
  var query = {
    q: searchString,
    part: 'snippet',
    key:'AIzaSyDLOpOm5iorBjZs6qrTcu_80-sRwAC_JdU',
    pageToken: page,
    prevPageToken: " ",
    searchString: searchString
    //pageToken: 'prevPageToken'
  }

  $.getJSON(yTube, query, function(data){
    if(data.prevPageToken){
      appState.prevPage = data.prevPageToken;
      renderPrev(appState, $('#pageTokenPrev'));
    }
      //appState.nextPage = data.nextPageToken;
      setResults(appState,data.items);
      getNextPage(appState, data.nextPageToken);
      getPrevPage(appState, data.prevPageToken);
      render(appState, $('.js-results'));
      setQuery(appState, query);
      renderNext(appState, $('#pageTokenNext'));
  });
} else {
  var query = {
    q: search,
    part: 'snippet',
    key:'AIzaSyDLOpOm5iorBjZs6qrTcu_80-sRwAC_JdU',
    pageToken: ' ',
    nextPageToken: page,
    prevPageToken: " ",
    searchString: searchString
    //pageToken: 'prevPageToken'
  }

  $.getJSON(yTube, query, function(data){
    if(data.prevPageToken){
      appState.prevPage = data.prevPageToken;
      renderPrev(appState, $('#pageTokenPrev'));
    }
      //appState.nextPage = data.nextPageToken;
      setResults(appState,data.items);
      getNextPage(appState, data.nextPageToken);
      getPrevPage(appState, data.prevPageToken);
      render(appState, $('.js-results'));
      setQuery(appState, query);
      renderNext(appState, $('#pageTokenNext'));
  });
}
}
//Tempate for how it should work
// getInfo('cat', function(response){
//   setResults(appState, response.items);
//   console.log(appState);
//   render(appState, $('ul.js-results'));
// });

//mod functions
function setQuery(state, query){
  state.q = query;
}

function setResults(state, results){
  state.results = results;
}

function Redirect(url){
  window.location=url;
}

function getPrevPage(state, prevPage){
  state.prevPage = prevPage;
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
  $('#pageTokenPrev').submit(function(event){
    event.preventDefault();
    let move = $('#pageTokenPrev').find('#tokenPrev').val();
    let page = appState.prevPage;
    let search = appState.q.q;
    getInfo(move, page, search);
  })

  $('#pageTokenNext').submit(function(event){
    event.preventDefault();
    let move = $('#pageTokenNext').find('#tokenNext').val();
    let page = appState.nextPage;
    let search = appState.q.q;
    console.log('a', move);
    getInfo(move, page, search);
  })

}

$(function (){


  addListeners();

});
