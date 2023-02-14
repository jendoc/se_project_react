import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";

// -------- Components --------

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

// -------- Utils --------

import { location, APIKey } from "../../utils/constants";
import {
  getForecastWeather,
  filterDataFromWeatherAPI,
} from "../../utils/weatherApi";
import { register, authorize, getUser, updateUser } from "../../utils/auth";
import * as api from "../../utils/api";

// -------- Contexts --------

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const App = () => {
  // -------- States --------

  const [weatherData, setWeatherData] = useState({});
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showFormError, setShowFormError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    avatar: "",
    _id: "",
  });

  // -------- Effects --------

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
        evt.target.classList.contains("item-modal") ||
        evt.target.classList.contains("confirm-modal")
      ) {
        closeModal();
      }
    }
    document.addEventListener("click", handleOverlay);
    return () => document.removeEventListener("click", handleOverlay);
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      setIsLoggedIn(true);
      getUser(token)
        .then((res) => {
          setCurrentUser(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    fetchClothingItems();
  }, []);

  // -------- UI Handlers/Actions --------

  const closeModal = () => {
    setActiveModal("");
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  const handleToggleModal = () => {
    activeModal === "login"
      ? setActiveModal("register")
      : setActiveModal("login");
  };

  const fetchClothingItems = () => {
    api
      .getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch((err) => console.log(err));
  };

  const handleFormError = () => {
    setShowFormError(false);
  };

  // -------- Card Handlers --------

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("item");
  };

  const handleDeleteClick = () => {
    setActiveModal("confirm");
  };

  const handleLikeClick = (cardId, isLiked) => {
    const apiMethod = isLiked ? api.removeCardLike : api.addCardLike;

    apiMethod(cardId)
      .then((updatedCard) => {
        const updatedItems = clothingItems.map((item) => {
          if (item._id === updatedCard._id) {
            return updatedCard;
          }
          return item;
        });
        setClothingItems(updatedItems);
      })
      .catch((err) => console.log(err));
  };

  const handleCardDelete = () => {
    api
      .deleteItem(selectedCard._id)
      .then(() => {
        setClothingItems(
          clothingItems.filter((item) => item._id !== selectedCard._id)
        );
        setSelectedCard({});
        closeModal();
      })
      .catch((err) => console.log(err));
  };

  const handleAddItemSubmit = (name, imageUrl, weatherType) => {
    setIsLoading(true);
    api
      .addItem(name, imageUrl, weatherType)
      .then((item) => {
        setClothingItems([...clothingItems, item]);
        closeModal();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // -------- User Handlers --------

  const handleRegistration = ({ name, avatar, email, password }) => {
    return register({ name, avatar, email, password })
      .then((res) => {
        setIsLoggedIn(true);
        setCurrentUser(res);
        closeModal();
      })
      .catch((err) => console.log(err));
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const handleAuthorization = (email, password) => {
    setIsLoading(true);
    setShowFormError(false);
    authorize(email, password)
      .then(() => {
        setIsLoggedIn(true);
        closeModal();
      })
      .catch((err) => {
        console.log(err);
        setShowFormError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleProfileUpdate = ({ name, avatar, token }) => {
    setIsLoading(true);
    updateUser(name, avatar, token)
      .then((res) => {
        setCurrentUser(res);
        closeModal();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <Header
            weatherData={weatherData}
            openAddModal={() => {
              setActiveModal("add");
            }}
            openLoginModal={() => {
              setActiveModal("login");
            }}
            openRegisterModal={() => {
              setActiveModal("register");
            }}
            isLoggedIn={isLoggedIn}
          />
          <Switch>
            <ProtectedRoute isLoggedIn={isLoggedIn} path="/profile">
              <Profile
                currentUser={currentUser}
                weatherData={weatherData}
                clothingItems={clothingItems}
                handleCardClick={handleCardClick}
                handleLikeClick={handleLikeClick}
                openAddModal={() => {
                  setActiveModal("add");
                }}
                openEditModal={() => {
                  setActiveModal("update");
                }}
                isLoggedIn={isLoggedIn}
                handleLogout={handleLogout}
                isLoading={isLoading}
              />
            </ProtectedRoute>
            <Route path={"/"}>
              <Main
                weatherData={weatherData}
                clothingItems={clothingItems}
                handleCardClick={handleCardClick}
                handleLikeClick={handleLikeClick}
                isLoggedIn={isLoggedIn}
              />
            </Route>
          </Switch>
          <Footer />

          <AddItemModal
            isOpen={activeModal === "add"}
            type={"add"}
            onAddItem={handleAddItemSubmit}
            onCloseModal={closeModal}
            isLoading={isLoading}
          />

          <ItemModal
            isOpen={activeModal === "item"}
            type={"item"}
            card={selectedCard}
            onCloseModal={closeModal}
            onDeleteClick={handleDeleteClick}
          />

          <ConfirmationModal
            isOpen={activeModal === "confirm"}
            type={"confirm"}
            onCloseModal={closeModal}
            onCardDelete={handleCardDelete}
          />

          <LoginModal
            isOpen={activeModal === "login"}
            type={"login"}
            onCloseModal={closeModal}
            handleToggleModal={handleToggleModal}
            handleLogin={handleAuthorization}
            handleProfileUpdate={handleProfileUpdate}
            showFormError={showFormError}
            setShowFormError={handleFormError}
            isLoading={isLoading}
          />

          <RegisterModal
            isOpen={activeModal === "register"}
            type={"register"}
            onCloseModal={closeModal}
            handleRegistration={handleRegistration}
            handleToggleModal={handleToggleModal}
            showFormError={showFormError}
            setShowFormError={handleFormError}
            isLoading={isLoading}
          />

          <EditProfileModal
            isOpen={activeModal === "update"}
            type={"update"}
            onCloseModal={closeModal}
            currentUser={currentUser}
            handleProfileUpdate={handleProfileUpdate}
            isLoading={isLoading}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
