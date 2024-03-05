
const apiKey = '1587159bb0692bc32c752afb5ebd8948';
let city;
let historicCities = [];

async function getWeather() {
	city = document.getElementById('city').value;
	historicCities.push(city);
	const response = await axios.get(
		`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
	)

	console.log(response);

	document.getElementById('temperature').innerHTML = `${response.data.main.temp}°C`;
	document.getElementById('description').innerHTML = `${response.data.weather[0].description}`
	document.getElementById('humidity').innerHTML = `${response.data.main.humidity}%`
	document.getElementById('wind').innerHTML = `${response.data.wind.speed}m/s`
	document.getElementById('icon').src = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;

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