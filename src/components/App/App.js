import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import "../../blocks/App/App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { location, APIKey, defaultClothingItems } from "../../utils/constants";
import {
  getForecastWeather,
  filterDataFromWeatherAPI,
} from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

const App = () => {
  const [weatherData, setWeatherData] = useState({});
  const [selectedCard, setSelectedCard] = useState({});
  const [activeModal, setActiveModal] = useState("");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

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

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  return (
    <>
      <div className="App">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <Header
            weatherData={weatherData}
            openModal={() => {
              setActiveModal("add");
            }}
          />
          <Route exact path={"/"}>
            <Main
              weatherData={weatherData}
              defaultClothing={defaultClothingItems}
              handleCardClick={handleCardClick}
            />
          </Route>
          <Route path={"/profile"}>
            <Profile
              weatherData={weatherData}
              defaultClothing={defaultClothingItems}
              handleCardClick={handleCardClick}
              openModal={() => {
                setActiveModal("add");
              }}
            />
          </Route>
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
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </>
  );
};

export default App;
