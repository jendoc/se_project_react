// const getForecastWeather = (location, APIKey) => {
//   return fetch(
//     `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&units=imperial&appid=${APIkey}`
//   ).then((res) => {
//     if (res.ok) {
//       return res.json();
//     } else {
//       return Promise.reject(`Error: ${res.status}`);
//     }
//   });
// };

// const filterDataFromWeatherAPI = (data) => {
//   if (!data) {
//     return null;
//   }
//   const weather = {};
//   weather.city = data.location.name;
//   weather.temperature = data.current.temp_f;
//   return weather;
// };

// export { getForecastWeather, filterDataFromWeatherAPI };
