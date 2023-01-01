const API_KEY = "ee3dab24cb5cb56a9a5f76f1764845ad"

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  axios({
    url,
    method: 'get',
  })
    .then(res => res.data)
    .then(data => {
      const weather = document.querySelector('#weather span:nth-child(2)');
      const temperature = document.querySelector('#weather span:nth-child(4)');
      const city = document.querySelector('#weather span:nth-child(6)');
      const country = document.querySelector('#weather span:nth-child(7)');
      weather.innerText = `${data.weather[0].main}  /  `;
      temperature.innerText = Math.round(data.main.temp);
      city.innerText = `${data.name} , `;
      country.innerText = data.sys.country;
    });

}


function onGeoError() {
  alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

