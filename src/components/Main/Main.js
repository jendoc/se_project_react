import "../../blocks/Main/Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import React, { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function Main({ weatherData, defaultClothing, handleCardClick }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const currentTemp =
    currentTemperatureUnit === "F"
      ? weatherData?.temperature?.F
      : weatherData?.temperature?.C;

  const HOT_WEATHER = 86;
  const COLD_WEATHER = 64;

  const getWeatherType = () => {
    if (currentTemp >= HOT_WEATHER) {
      return "hot";
    } else if (
      currentTemp >= COLD_WEATHER - 1 &&
      currentTemp <= HOT_WEATHER - 1
    ) {
      return "warm";
    } else if (currentTemp <= COLD_WEATHER) {
      return "cold";
    }
  };

  function filterClothing(card) {
    if (card.weather === getWeatherType()) {
      return true;
    } else {
      return false;
    }
  }

  const clothingOptions = defaultClothing.filter((items) =>
    filterClothing(items)
  );

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} currentTemp={currentTemp} />
      <h3 className="main__header">
        Today is
        {` ${currentTemp}°${currentTemperatureUnit} `} / You may want
        to wear:
      </h3>
      <ul className="main__gallery">
        {clothingOptions.map((item) => (
          <ItemCard
            isOpen="false"
            clothingOption={item}
            key={item._id}
            name={item.name}
            image={item.link}
            weather={item.weather}
            onClick={() => handleCardClick(item)}
          />
        ))}
      </ul>
    </main>
  );
}

export default Main;
