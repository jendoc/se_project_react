import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";

import { location, APIKey, baseUrl } from "../../utils/constants";
import {
  getForecastWeather,
  filterDataFromWeatherAPI,
} from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import * as auth from "../../utils/auth";
import * as api from "../../utils/api";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

const App = () => {
  const [weatherData, setWeatherData] = useState({});
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    avatar: "",
    _id: ""
  });

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

  const closeModal = () => {
    setActiveModal("");
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("item");
  };

  const handleDeleteClick = () => {
    setActiveModal("confirm");
  };

  const handleLikeClick = ({ id, isLiked, user }) => {
    const token = localStorage.getItem("jwt");
    isLiked
      ? api
          .addCardLike({ id, user }, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((card) => (card._id === id ? updatedCard : card))
            );
          })
          .catch((err) => console.log(err))
      : api
          .removeCardLike({ id, user }, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((card) => (card._id === id ? updatedCard : card))
            );
          })
          .catch((err) => console.log(err));
  };

  const handleCardDelete = () => {
    api
      .deleteItem(selectedCard.id)
      .then(() => {
        setClothingItems(
          clothingItems.filter((item) => item.id !== selectedCard.id)
        );
        setSelectedCard({});
        closeModal();
      })
      .catch((err) => console.log(err));
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

  useEffect(() => {
    fetchClothingItems();
  }, []);

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

  const handleRegistration = (name, avatar, email, password) => {
    auth.register(name, avatar, email, password).then((res) => {
      console.log(res);
      handleAuthorization(res.email, res.password);
      setIsLoggedIn(true);
      closeModal();
    });
  };

  const handleAuthorization = (email, password) => {
    auth
      .authorize(email, password)
      .then(() => {
        handleCheckToken();
        setIsLoggedIn(true);
        closeModal();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleLogOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const handleCheckToken = () => {
    auth
      .checkToken(localStorage.getItem("jwt"))
      .then((user) => {
        if (user) {
          setIsLoggedIn(true);
          setCurrentUser(user);
        } else {
          setIsLoggedIn(false);
          setCurrentUser({});
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
    }
  }, [isLoggedIn]);

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
          />
          <Switch>
            <Route path={"/"}>
              <Main
                weatherData={weatherData}
                clothingItems={clothingItems}
                handleCardClick={handleCardClick}
                handleLikeClick={handleLikeClick}
                loggedIn={isLoggedIn}
              />
            </Route>
            <ProtectedRoute loggedIn={isLoggedIn} path={"/profile"}>
              <Profile
                user={currentUser}
                weatherData={weatherData}
                clothingItems={clothingItems}
                handleCardClick={handleCardClick}
                openModal={() => {
                  setActiveModal("add");
                }}
                loggedIn={isLoggedIn}
                handleLogOut={handleLogOut}
              />
            </ProtectedRoute>
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
            handleSignIn={handleAuthorization}
            isOpen={activeModal === "login"}
            type={"login"}
            onCloseModal={closeModal}
            handleAuthorization={handleAuthorization}
            handleToggleModal={handleToggleModal}
          />

          <RegisterModal
            handleSignUp={handleRegistration}
            isOpen={activeModal === "register"}
            type={"register"}
            onCloseModal={closeModal}
            handleRegistration={handleRegistration}
            handleToggleModal={handleToggleModal}
          />

          <EditProfileModal
            isOpen={activeModal === "update"}
            type={"update"}
            onCloseModal={closeModal}
            currentUser={currentUser}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
