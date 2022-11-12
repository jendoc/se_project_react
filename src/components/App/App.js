import React, { useState, useEffect } from "react";
import "../../blocks/App/App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { location, APIKey, defaultClothingItems } from "../../utils/constants";
import {
  getForecastWeather,
  filterDataFromWeatherAPI,
} from "../../utils/weatherApi";

const App = () => {
  const [weatherData, setWeatherData] = useState({});
  const [selectedCard, setSelectedCard] = useState({});
  const [activeModal, setActiveModal] = useState("");

  useEffect(() => {
    if (location.latitude && location.longitude) {
      getForecastWeather(location, APIKey)
        .then((data) => {
          setWeatherData(filterDataFromWeatherAPI(data));
        })
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    function handleEscape(evt) {
      if (evt.code === "Escape") {
        closeModal();
      }
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    function handleOverlay(evt) {
      if (
        evt.target.classList.contains("modal") ||
        evt.target.classList.contains("item-modal")
      ) {
        closeModal();
      }
    }
    document.addEventListener("click", handleOverlay);
    return () => document.removeEventListener("click", handleOverlay);
  }, []);

  const closeModal = () => {
    setActiveModal(false);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("item");
  };

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
        <ModalWithForm
          isOpen={activeModal === "add"}
          type="add"
          title="New garment"
          buttonText="Add garment"
          onClose={closeModal}
        >
          <h4 className="form__label">Name</h4>
          <input
            className="form__input form__input_type_name"
            name="name"
            type="text"
            placeholder="Name"
            minLength="1"
            maxLength="40"
            required
          />
          <h4 className="form__label">Image</h4>
          <input
            className="form__input form__input_type_image"
            name="image"
            type="url"
            placeholder="Image URL"
            required
          />
          <h4 className="form__label">Select the weather type:</h4>
          <div className="form__radio-container">
            <div className="form__radio">
              <input
                className="form__input_radio"
                name="temp"
                value="Hot"
                type="radio"
                id="hot"
              />
              <label className="form__label_radio" htmlFor="hot">
                Hot
              </label>
            </div>
            <div className="form__radio">
              <input
                className="form__input_radio"
                name="temp"
                value="Warm"
                type="radio"
                id="warm"
              />
              <label className="form__label_radio" htmlFor="warm">
                Warm
              </label>
            </div>
            <div className="form__radio">
              <input
                className="form__input_radio"
                name="temp"
                value="Cold"
                type="radio"
                id="cold"
              />
              <label className="form__label_radio" htmlFor="cold">
                Cold
              </label>
            </div>
          </div>
        </ModalWithForm>

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
