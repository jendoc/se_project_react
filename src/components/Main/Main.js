import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import defaultClothingItems from "../utils/deafultClothingItems";

function Main({ weatherData, cards, onCardClick }) {
  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <h3 className="main__header">
        Today is {Math.round(weatherData.temperature)}&deg;F / You may want to
        wear:
      </h3>
      <ul className="main__gallery">
        <ItemCard />
      </ul>
    </main>
  );
}

export default Main;
