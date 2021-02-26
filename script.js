

const API_KEY = 'bt4oakn48v6um6kgpvvg'
const BASE_URL = 'https://finnhub.io/api/v1'
let marketNewsData = null;

const DATA_TYPE = {
  symbolLookup: {
    type: 'symbolLookup',
    formatter: null,
    url: "/search?q="
  },
  marketNews: {
    type: "marketData",
    formatter: null,
    url: "/news?category="
  },
  companyProfile: {
    type: "compayProfile",
    formatter: null,
    url: "/stock/profile2?symbol="    
  },
  quote: {
    type: "quote",
    formatter: null,
    url: "/quote?symbol="
  }
}

const returnSymbolLookup = (json) => {
  let ticker = json.result[0].displaySymbol;
  document.getElementById('loading').innerHTML = '';
  
  getFinnHubData(ticker, 'companyProfile');
}

const returnCompanyProfile = (json) => {
  let html = '';
  html += `<div id='company-profile'>
              <img src=${json.logo}>
              <p id='company-name'>${json.name}</p>
           </div>
           <div id='company-details'>
              <p class='company-item'>Ticker: ${json.ticker}</p>
              <p class='company-item'>Exchange: ${json.exchange}</p>
              <p class='company-item'>Country: ${json.country}</p>
              <p class='company-item'>Website: ${json.weburl}</p>
            </div>`

  getFinnHubData(json.ticker, 'quote');
  document.getElementById('companyInfo').innerHTML = html;
}

const returnQuote = (json) => {
  let html = '';
  html += `<h3>Stock Info</h3>
           <p>Current Price: $${json.c}</p>
           <p>Open Price: $${json.o}</p>
           <p>Days' High: $${json.h}</p>
           <p>Days' Low: $${json.l}</p>`

  document.getElementById('stockInfo').innerHTML = html;
}

const returnMarketData = (json) => {
  let marketDataString = ''
  for (let i=0; i < json.length; i++) {
    marketDataString += json[i].headline
    if (i < json.length - 1) {
      marketDataString += ' || '
    }
  }

  document.getElementById("scroll-news").innerText = marketDataString;
}

const getFinnHubData = (value, dataType) => {
  const path = DATA_TYPE[dataType].url
  const url = `${BASE_URL}${path}${value}&token=${API_KEY}`;
  fetch(url)
    .then((res) => {
      return res.json();
    }).then((json) => {
      console.log(json);
      DATA_TYPE[dataType].formatter(json);
    })
    .catch((err) => {
      console.log(`Error with request: ${err}`)
    });
}

// Start of run time scripts
DATA_TYPE['symbolLookup'].formatter = returnSymbolLookup;
DATA_TYPE['marketNews'].formatter = returnMarketData;
DATA_TYPE['quote'].formatter = returnQuote;
DATA_TYPE['companyProfile'].formatter = returnCompanyProfile;

document.getElementById("tickerClear").addEventListener("click", function(event) {
  event.preventDefault();
  document.getElementById("tickerInput").value = '';
  document.getElementById("weatherResults").innerHTML = '<p class="no-result">No Results... Please enter a valid company name or ticker.</p>';
  document.getElementById("forecastResults").innerHTML = '';
});

document.addEventListener("DOMContentLoaded", function() {
  getFinnHubData('general', 'marketNews');
});

document.getElementById("tickerSubmit").addEventListener("click", function() {
  document.getElementById("companyInfo").innerText = '';
  document.getElementById("stockInfo").innerText = '';
  event.preventDefault();
  const value = document.getElementById("tickerInput").value;
  if (!value) return;

  document.getElementById('results-title').innerHTML = "<h1>Results</h1>";
  document.getElementById('loading').innerHTML = '<p>Loading...</p>';
  
  console.log(value);
  getFinnHubData(value, 'symbolLookup');
})


