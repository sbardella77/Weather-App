
var searchElement = document.querySelector('[data-city-search]')

var searchBox = new google.maps.places.SearchBox(searchElement)

searchBox.addListener('places_changed', () => {
  var place = searchBox.getPlaces()[0]

  if (place == null) return

  var latitude = place.geometry.location.lat()
  var longitude = place.geometry.location.lng()
    console.log(latitude,longitude)
  
  return fetch('/weather', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      latitude: latitude,
      longitude: longitude
    })
  })
    .then(res => res.json()).then(data => {
      setWeatherData(data, place.formatted_address)
      console.log(data)
    })
})

// axios.get('/weather', {
//   latitude: 'latitude',
//   longitude: 'longitude'
// })
// .then(res => res.json())
// .then(data=>{
//     setWeatherData(data,place.formatted_address)
//     console.log(data)
// })
// .catch((error) => {
//   console.log(error);
// });

// SET VALUE FROM WEATHER API (DARKSKY)
// SET ICON FROM Skycons
const icon = new Skycons({ color: '#222' })

const locationElement = document.querySelector('[data-location]')
const statusElement = document.querySelector('[data-status]')
const windSpeed = document.querySelector('[data-wind]')
const temperatureElement = document.querySelector('[data-temperature]')
const precipitationElement = document.querySelector('[data-precipitation]')
icon.set('icon', 'clear-day')
icon.play()

function setWeatherData (data, place) {
  locationElement.textContent = place
  statusElement.textContent = data.summary
  windSpeed.textContent = data.windSpeed
  temperatureElement.textContent = data.temperature
  precipitationElement.textContent = `${data.precipProbability * 100}%`
  icon.set('icon', data.icon)
  icon.play()
}
