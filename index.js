const apiKey = '1587159bb0692bc32c752afb5ebd8948';
let city;
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
	const response = await axios.get(
		`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
	);
	setWeatherData(response.data);
	historicCities.push(city);
	localStorage.setItem('historicCities', JSON.stringify(historicCities));
	updateHistory();
}

async function getWeatherByCoordinates(lat, lon) {
	const { data } = await axios.get(
		`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
	);

	setWeatherData(data);
	historicCities.push(data.name);
	localStorage.setItem('historicCities', JSON.stringify(historicCities));
	updateHistory();
}

function setWeatherData(data) {
	const celsius = `${data.main.temp}°C`;
	document.getElementById('temperature').innerHTML = celsius;
	document.getElementById('description').innerHTML = data.weather[0].description;
	document.getElementById('humidity').innerHTML = `${data.main.humidity}%`;
	document.getElementById('wind').innerHTML = `${data.wind.speed}m/s`;
	document.getElementById('icon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}

function updateHistory() {
	document.getElementById('history').innerHTML = historicCities.join('<br>');
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