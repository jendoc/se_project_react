import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
  if (!weatherData) return null;

  const today = new Date(),
    time = today.getHours();

  const getDay = (hours) => {
    if (hours >= 6 && hours <= 17) {
      return "day";
    } else {
      return "night";
    }
  };

  const weatherCondition = weatherData?.conditions?.toLowerCase() || "";

  function getWeatherIcon() {
    if (weatherCondition === null) return "";
    if (weatherCondition.includes("clear")) {
      return (`${getDay(time)}Clear.svg`);
    } else if (weatherCondition.includes("clouds")) {
      return (`${getDay(time)}Clouds.svg`)
    } else if (weatherCondition.includes("fog")) {
      return (`${getDay(time)}Fog.svg`)
    } else if (weatherCondition.includes("rain") ||
    weatherCondition.includes("drizzle")) {
      return (`${getDay(time)}Rain.svg`)
    } else if (weatherCondition.includes("snow")) {
      return (`${getDay(time)}Snow.svg`)
    } else {
      return (`${getDay(time)}Storm.svg`)
    }
  };

  function checkForRain() {
    if (weatherCondition.includes("clear") ||
    weatherCondition.includes("clouds")) {
      return ("clear")
    } else {
      return ("precip")
    }
  }

  console.log(process.env.PUBLIC_URL + "/" + getWeatherIcon())

  return (
    <div className={`weathercard weathercard__background_${getDay(time)}_${checkForRain()}`}>
      <h2 className="weathercard__temp">
        {Math.round(weatherData.temperature)}&deg;F
      </h2>
      <div className="weathercard__image-wrapper">
        <img className="weathercard__image" src={process.env.PUBLIC_URL + "/" + getWeatherIcon()} />
      </div>
    </div>
  );
}

export default WeatherCard;
