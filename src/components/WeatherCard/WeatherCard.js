import "../../blocks/WeatherCard/WeatherCard.css";
import React, { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

const DAY_HOUR = 6;
const NIGHT_HOUR = 17;

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  if (!weatherData) return null;

  const today = new Date(),
    time = today.getHours();

  const getDay = (hours) => {
    if (hours >= DAY_HOUR && hours <= NIGHT_HOUR) {
      return "day";
    } else {
      return "night";
    }
  };

  const weatherCondition = weatherData?.conditions?.toLowerCase() || "";

  function getWeatherIcon() {
    if (weatherCondition === null) return "";
    if (weatherCondition.includes("clear")) {
      return `${getDay(time)}Clear.svg`;
    } else if (weatherCondition.includes("clouds")) {
      return `${getDay(time)}Clouds.svg`;
    } else if (weatherCondition.includes("fog")) {
      return `${getDay(time)}Fog.svg`;
    } else if (
      weatherCondition.includes("rain") ||
      weatherCondition.includes("drizzle")
    ) {
      return `${getDay(time)}Rain.svg`;
    } else if (weatherCondition.includes("snow")) {
      return `${getDay(time)}Snow.svg`;
    } else {
      return `${getDay(time)}Storm.svg`;
    }
  }

  function checkForRain() {
    if (
      weatherCondition.includes("clear") ||
      weatherCondition.includes("clouds")
    ) {
      return "clear";
    } else {
      return "precip";
    }
  }

  return (
    <div
      className={`weathercard weathercard__background_${getDay(
        time
      )}_${checkForRain()}`}
    >
      <h2 className="weathercard__temp">
        {weatherData.temperature[currentTemperatureUnit]}
      </h2>
      <div className="weathercard__image-wrWeatherCarder">
        <img
          className="weathercard__image"
          src={process.env.PUBLIC_URL + "/" + getWeatherIcon()}
        />
      </div>
    </div>
  );
}

export default WeatherCard;
