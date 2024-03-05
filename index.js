
const apiKey = '1587159bb0692bc32c752afb5ebd8948';
let city;
// check for stored history and initialize it
let historicCities = JSON.parse(localStorage.getItem('historicCities')) || [];

getUserLocationAndWeather();

function getUserLocationAndWeather() {
	getUserCoordinates()
		.then((position) => {
			const lat = position.coords.latitude;
			const lon = position.coords.longitude;
			getWeatherByCoordinates(lat, lon);
		})
		.catch((error) => {
			console.error(error);
			alert('Unable to retrieve your location for weather information.');
		});
}

async function getWeather() {
	city = document.getElementById('city').value;
	historicCities.push(city);
	const response = await axios.get(
		`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
	)

	document.getElementById('temperature').innerHTML = `${response.data.main.temp}°C`;
	document.getElementById('description').innerHTML = `${response.data.weather[0].description}`
	document.getElementById('humidity').innerHTML = `${response.data.main.humidity}%`
	document.getElementById('wind').innerHTML = `${response.data.wind.speed}m/s`
	document.getElementById('icon').src = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;

	// Saving the city to historicCities array and updating the history on the page

	historicCities.push(city);
	document.getElementById('history').innerHTML = historicCities.join('<br>');
	// Save the historicCities array to local storage
	localStorage.setItem('historicCities', JSON.stringify(historicCities));

}

async function getWeatherByCoordinates(lat, lon) {
	const response = await axios.get(
		`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
	);

	// console.log(response);

	document.getElementById('temperature').innerHTML = `${response.data.main.temp}°C`;
	document.getElementById('description').innerHTML = `${response.data.weather[0].description}`;
	document.getElementById('humidity').innerHTML = `${response.data.main.humidity}%`;
	document.getElementById('wind').innerHTML = `${response.data.wind.speed}m/s`;
	document.getElementById('icon').src = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;

	// Saving the city to historicCities array and updating the history on the page
	const city = response.data.name;
	historicCities.push(city);
	document.getElementById('history').innerHTML = historicCities.join('<br>');

	// Save the historicCities array to local storage
	localStorage.setItem('historicCities', JSON.stringify(historicCities));
}

function getUserCoordinates() {
	return new Promise((resolve, reject) => {
		if (!navigator.geolocation) {
			reject('Geolocation is not supported by your browser.');
		} else {
			navigator.geolocation.getCurrentPosition(resolve, reject);
		}
	});
}

function clearHistory() {
	historicCities = [];
	document.getElementById('history').innerHTML = '';
	localStorage.removeItem('historicCities');
}