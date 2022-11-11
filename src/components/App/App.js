
import React, { useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { location, APIKey, defaultClothingItems } from "../utils/constants";
import {
  getForecastWeather,
  filterDataFromWeatherAPI,
} from "../utils/weatherApi";

const App = () => {
  const [weatherData, setWeatherData] = useState({});
  const [selectedCard, setSelectedCard] = useState("");
  const [activeModal, setActiveModal] = useState({});

  React.useEffect(() => {
    if (location.latitude && location.longitude) {
      getForecastWeather(location, APIKey)
        .then((data) => {
          setWeatherData(filterDataFromWeatherAPI(data));
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const closeModal = () => {
    setActiveModal(false);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("item");
  };

  console.log(activeModal)

  return (
    <>
      <div className="App">
        <Header
          weatherData={weatherData}
          openModal={() => {
            setActiveModal("add");
          }}
        />
        <Main
          weatherData={weatherData}
          defaultClothing={defaultClothingItems}
          handleCardClick={handleCardClick}
        />
        <Footer />
        <ItemModal
        isOpen={activeModal === "item"}
        type={"item"}
        card={selectedCard}
        onClose={closeModal}
      />
      </div>
      
    </>
  );
};

export default App;
