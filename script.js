

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
  let ticker = json.result[0].description;
  document.getElementById('results-title').innerHTML = "<h1>Results</h1>";

  document.getElementById("forecastResults").innerHTML = "<p>" + ticker + "</p>";
}

const returnCompanyProfile = (json) => {

}

const returnQuote = (json) => {

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
  // let results = '';
  // results += `<h2>Weather in ${json.name}</h2>`;
  // results += `<div class="entry">`
  // for (let i=0; i < json.weather.length; i++) {
  //   results += `<div><img class="weather-icon" src="http://openweathermap.org/img/w/${json.weather[i].icon}.png"/></div>`;
  // }
  // results += `<p>Min temp: ${json.main.temp_min}&deg;F<br/>
  //             Max temp: ${json.main.temp_max}&deg;F<br/>
  //             Feels Like: ${json.main.temp}&deg;F</br>
  //             <strong>Current Temp: ${json.main.temp}&deg;F</strong></p>`
  // results += `<div class="description"><h4>Description:</h4><p>`;
  // for (let i=0; i < json.weather.length; i++) {
  //   results += json.weather[i].description
  //   if (i !== json.weather.length - 1) {
  //     results += `, `;
  //   }
  // }
  // results += `<br/>Sunrise: ${moment(json.sys.sunrise).format('h:mm:ss a')}<br/>
  //             Sunset: ${moment(json.sys.sunset).format('h:mm:ss a')} </p></div></div>`;
  // document.getElementById("weatherResults").innerHTML = results;

// const returnForecastData = (json) => {
//   let forecast = '<h2>5 Day Forecast</h2>'
//   let data = {}
//   let dateSet = new Set()
//   for (let i=0; i < json.list.length; i++) { 
//     let date = moment(json.list[i].dt_txt);
//     let dateFormatted = date.format('YYYYMMDD');
//     dateSet.add(dateFormatted);
//     if (data[dateFormatted]) {
//       data[dateFormatted].push(json.list[i]);
//     } else {
//       data[dateFormatted] = [];
//       data[dateFormatted].push(json.list[i]);
//     }
//   }
//   console.log(data)
//   const array = Array.from(dateSet)
//   const sortedArray = array.sort((a,b) => a - b)

//   forecast += `<div class="entry">`;
//   for (let j=0; j < sortedArray.length; j++) {
//     const day = data[sortedArray[j]]
//     forecast += `<div class="forecast-day">`;
//     forecast += `<h4>${moment(day[0].dt_txt).format('MMMM Do YYYY')}</h4>`
//     for (let i=0; i < day.length; i++) {
//       forecast += `<div class="hour">`
//       forecast += "<h5>" + moment(day[i].dt_txt).format('h:mm:ss a') + "</h5>";
//       forecast += `<p>Min temp: ${day[i].main.temp_min}</p>`
//       forecast += `<p>Max temp: ${day[i].main.temp_max}</p>`
//       forecast += `<p>Feels Like: ${day[i].main.feels_like}</p>`
//       forecast += "<p>Temperature: " + day[i].main.temp + "</p>";
//       forecast += '<img src="http://openweathermap.org/img/w/' + day[i].weather[0].icon + '.png"/>'
//       desc = day[i].weather[0].description
//       forecast += `<p><strong>${desc[0].toUpperCase() + desc.slice(1)}</strong></p>`
//       forecast += `</div>`
//     } 
//     forecast += `</div>`;
//   }
//   forecast += `</div>`;
//   document.getElementById("forecastResults").innerHTML = forecast;
// }

const getFinnHubData = (value, dataType) => {
  const path = DATA_TYPE[dataType].url
  const url = `${BASE_URL}${path}${value}&token=${API_KEY}`;
  console.log(url);
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

// document.getElementById("weatherSubmit").addEventListener("click", function(event) {
//   event.preventDefault();
//   const value = document.getElementById("weatherInput").value;
//   if (!value) return;
//   console.log(value);
//   getFinnHubData(value, 'weather');
//   getFinnHubData(value, 'forecast');
// });

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
  document.getElementById('companyInfo').innerHTML = '<p>Loading...</p>';
  
  console.log(value);
  getFinnHubData(value, 'symbolLookup');
})


