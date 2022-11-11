import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

function Main({ weatherData, defaultClothing, handleCardClick }) {
  const currentWeather = weatherData.temperature;
  const weatherType = () => {
    if (currentWeather >= 86) {
      return "hot";
    } else if (currentWeather >= 66 && currentWeather <= 85) {
      return "warm";
    } else if (currentWeather <= 65) {
      return "cold"
    }
  }

  function filterClothing(card, data) {
    if (card.weather === data) {
      return true;
    } else {
      return false;
    }
  }

  const clothingOptions = defaultClothing.filter((items) =>
  filterClothing(items, weatherType()))
  
  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <h3 className="main__header">
        Today is {Math.round(currentWeather)}&deg;F / You may want to
        wear:
      </h3>
      <ul className="main__gallery">
        {clothingOptions.map((item) => {
          return(
            <ItemCard
            isOpen="false"
            clothingOption={item}
            key={item._id}
            name={item.name}
            image={item.link}
            weather={item.weather}
            handleCardClick={handleCardClick}
            />
          )
        })}
      </ul>
    </main>
  );
}

export default Main;
