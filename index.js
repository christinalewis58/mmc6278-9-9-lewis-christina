//turn all var into const, the change what needs to be reassigned to let
//turn functions into arrow functions

const URL = "https://api.openweathermap.org/data/2.5/weather"
const weatherSection = document.getElementById('weather')
const weatherSearch = document.getElementById('weather-search')
const form = document.querySelector('form')

//After submitting the form, the app should make a call to the Open Weather API's current weather endpoint using the JavaScript fetch API to obtain current weather data based on the location entered by the user.
form.onsubmit = function(e) {
    e.preventDefault() //prevent automatic form submission

    
    const userInput = weatherSearch.value
    //use template literals instead of string concatenation
    const queryString = "?units=imperial&appid=752927b6e41474a250396108bc4941a3&q=" + userInput
    const newURL = URL + queryString //concatenate url

        if(!userInput) return
        fetch(newURL)
    
    
   
        .then(function(res){ 
            //Handle incorrect input with location not found
            if (res.status !== 200) throw new Error('Location Not Found') 
            return res.json()
        })

    //call display data function
    .then(displayData)

    .catch(function(err){
        weatherSection.innerHTML = err.message
        weatherSearch.value = ""
    })
}
    
//Display the fetched data in the weather section
function displayData(res) {
weatherSection.innerHTML = ""  //reset input

//Once data is fetched from openweather, display in html section tag

//1.The city and country code
var city = document.createElement('h2')
    city.textContent = res.name + ", " + res.sys.country
    weatherSection.appendChild(city)

//2.A Google Maps link to the location
var map = document.createElement('a')
    map.textContent = "Click to view map"
    map.href = 'https://www.google.com/maps/search/?api=1&query=' + res.coord.lat + "," + res.coord.lon
    map.target = '_blank'
    weatherSection.appendChild(map)

//3.A weather icon representing the current weather 
var icon = document.createElement('img')
    icon.src = 'https://openweathermap.org/img/wn/' + res.weather[0].icon + '@2x.png'
    weatherSection.appendChild(icon)

//4.A description of the current weather condition
var weatherDescription = document.createElement('p')
    weatherDescription.textContent = res.weather[0].description
    weatherSection.appendChild(weatherDescription)

//5.The actual temperature
var currentTemp = document.createElement('p')
    currentTemp.innerHTML = 'Current: ' + res.main.temp + '&deg;' + ' F'
    weatherSection.appendChild(currentTemp) 

//6.The Perceived Temperature
var perceivedTemp = document.createElement('p')
    perceivedTemp.innerHTML = 'Feels like: ' + res.main.feels_like + '&deg;' + ' F'
    weatherSection.appendChild(perceivedTemp) 

//7. The time the weather information was last updated
var lastUpdated = document.createElement('p')
var date = new Date(res.dt * 1000)
var timeString = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit'
  })
    lastUpdated.textContent = timeString
    weatherSection.appendChild(lastUpdated)
    console.log(date)

}

//create function display error message