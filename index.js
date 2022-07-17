//ES5 to ES6 
//let/const
//template literals
//arrow functions
//destructuring
//async await functions


const URL = "https://api.openweathermap.org/data/2.5/weather"
const weatherSection = document.getElementById('weather')
const weatherSearch = document.getElementById('weather-search')
const form = document.querySelector('form')

//After submitting the form, the app should make a call to the Open Weather API's current weather endpoint using the JavaScript fetch API to obtain current weather data based on the location entered by the user.
form.onsubmit = async (e) => {
    e.preventDefault() //prevent automatic form submission
    const userInput = weatherSearch.value
    console.log(userInput)
    const queryString = `?units=imperial&appid=752927b6e41474a250396108bc4941a3&q=${userInput}`
    const newURL = `${URL}${queryString}`
        if(!userInput) return
        let res = await fetch(newURL)
        if(res.status !== 200) {
            weatherSection.innerHTML = 'Location not found'
            weatherSearch.value = ""
            return
        }
        console.log(res)
        res = await res.json()
        console.log(res) 
        displayData(res)
}
    
//Display the fetched data in the weather section
const displayData = (res) => {
weatherSection.innerHTML = ""  //reset input

//Once data is fetched from openweather, display in html section tag

//1.The city and country code
const city = document.createElement('h2')
const {name} = res
    city.textContent = `${name}, ${res.sys.country}`
    weatherSection.appendChild(city)

//2.A Google Maps link to the location
const map = document.createElement('a')
    map.textContent = "Click to view map"
    map.href = `https://www.google.com/maps/search/?api=1&query=${res.coord.lat}, ${res.coord.lon}`
    map.target = '_blank'
    weatherSection.appendChild(map)

//3.A weather icon representing the current weather 
const icon = document.createElement('img')
    icon.src = `https://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png` //left off HERE
    weatherSection.appendChild(icon)

//4.A description of the current weather condition
const weatherDescription = document.createElement('p')
    weatherDescription.textContent = res.weather[0].description
    weatherSection.appendChild(weatherDescription)

//5.The actual temperature
const currentTemp = document.createElement('p')
    currentTemp.innerHTML = `Current: ${res.main.temp}&deg; F`
    weatherSection.appendChild(currentTemp) 

//6.The Perceived Temperature
const perceivedTemp = document.createElement('p')
    perceivedTemp.innerHTML = `Feels like: ${res.main.feels_like}&deg; F`
    weatherSection.appendChild(perceivedTemp) 

//7. The time the weather information was last updated
const lastUpdated = document.createElement('p')
const date = new Date(res.dt * 1000)
const timeString = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit'
  })
    lastUpdated.textContent = timeString
    weatherSection.appendChild(lastUpdated)
    console.log(date)

}

