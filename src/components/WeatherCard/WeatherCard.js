import "./WeatherCard.css";
import sunPath from "../images/sun.svg";

function WeatherCard({ weatherData }) {
  if (!weatherData) return null;



  return (
    <div className="weathercard weathercard__background_night">
      <h2 className="weathercard__temp">
        {Math.round(weatherData.temperature)}&deg;F
      </h2>
      <div className="weathercard__image-wrapper">
        <img className="weathercard__image" src={sunPath} />
      </div>
    </div>
  );
}

export default WeatherCard;
