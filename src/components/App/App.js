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

import { location, APIKey } from "../../utils/constants";
import {
  getForecastWeather,
  filterDataFromWeatherAPI,
} from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { register, authorize, getUser, updateUser } from "../../utils/auth";
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
    _id: "",
  });

  // ! Remove before submit
  console.log(currentUser);
  console.log(isLoggedIn);
  // !

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

  const handleRegistration = ({name, avatar, email, password}) => {
    return register({name, avatar, email, password}).then((data) => {
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
    authorize(email, password)
      .then(() => {
        setIsLoggedIn(true);
        closeModal();
      })
      .catch((err) => console.log(err));
  };

  const handleProfileUpdate = async ({ name, avatar, token }) => {
    updateUser(name, avatar, token)
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
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const jwt = localStorage.getItem("token");
      setIsLoggedIn(true);
      getUser(jwt)
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
                loggedIn={isLoggedIn}
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
            handleUserUpdate={handleProfileUpdate}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;