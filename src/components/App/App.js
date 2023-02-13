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
  const [weatherData, setWeatherData] = useState({});
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showFormError, setShowFormError] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    avatar: "",
    id: "",
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
          setCurrentUser({
            name: res.data.name,
            avatar: res.data.avatar,
            id: res.data._id,
          });
        })
        .catch((e) => {
          console.log(e);
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
    const token = localStorage.getItem("token");
    isLiked
      ? api
          .removeCardLike(cardId)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((card) => (card._id === cardId ? updatedCard : card))
            );
          })
          .catch((err) => console.log(err))
      : api
          .addCardLike(cardId)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((card) => (card._id === cardId ? updatedCard : card))
            );
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
    api
      .addItem(name, imageUrl, weatherType)
      .then((item) => {
        const items = [item, ...clothingItems];
        setClothingItems(items);
        closeModal();
      })
      .catch((err) => console.log(err));
  };

  // -------- User Handlers --------

  const handleRegistration = ({ name, avatar, email, password }) => {
    return register({ name, avatar, email, password }).then((data) => {
      setIsLoggedIn(true);
      setCurrentUser({ name: data.name, avatar: data.avatar });
      closeModal();
    });
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const handleAuthorization = (email, password) => {
    setShowFormError(false);
    authorize(email, password)
      .then(() => {
        setIsLoggedIn(true);
        closeModal();
      })
      .catch((err) => {
        console.log(err);
        setShowFormError(true);
      });
  };

  const handleProfileUpdate = async ({ name, avatar, token }) => {
    updateUser(name, avatar, token)
      .then((res) => {
        setCurrentUser({
          name: res.data.name,
          avatar: res.data.avatar,
          _id: res.data._id,
        });
      })
      .catch((e) => {
        console.log(e);
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
                openAddModal={() => {
                  setActiveModal("add");
                }}
                openEditModal={() => {
                  setActiveModal("update");
                }}
                isLoggedIn={isLoggedIn}
                handleLogout={handleLogout}
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
          />

          <RegisterModal
            handleSignUp={handleRegistration}
            isOpen={activeModal === "register"}
            type={"register"}
            onCloseModal={closeModal}
            handleRegistration={handleRegistration}
            handleToggleModal={handleToggleModal}
            showFormError={showFormError}
            setShowFormError={handleFormError}
          />

          <EditProfileModal
            isOpen={activeModal === "update"}
            type={"update"}
            onCloseModal={closeModal}
            currentUser={currentUser}
            handleUserUpdate={handleProfileUpdate}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
