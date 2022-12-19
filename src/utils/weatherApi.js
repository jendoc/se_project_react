const getForecastWeather = (location, APIKey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&units=imperial&appid=${APIKey}`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
};

const filterDataFromWeatherAPI = (data) => {
  if (!data) {
    return null;
  }
  const weather = {};
  weather.city = data.name;
  weather.temperature.F = `${Math.round(data.main.temp)}°F`;
  weather.temperature.C = `${Math.round(((data.main.temp - 32) * 5) / 9)}°C`;
  weather.conditions = data.weather[0].main;
  return weather;
};

export { getForecastWeather, filterDataFromWeatherAPI };
