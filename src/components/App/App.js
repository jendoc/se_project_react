import "./App.css";
import { location, APIKey } from "../utils/constants";
import {
  getForecastWeather,
  filterDataFromWeatherAPI,
} from "../utils/weatherApi";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import React, { useState } from "react";

const App = () => {
  const [weatherData, setWeatherData] = React.useState({});

  React.useEffect(() => {
    if (location.latitude && location.longitude) {
      getForecastWeather(location, APIKey)
        .then((data) => {
          setWeatherData(filterDataFromWeatherAPI(data));
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <div className="App">
      <Header weatherData={weatherData} />
      <Main weatherData={weatherData}/>
      <Footer />
    </div>
  );
};

export default App;
