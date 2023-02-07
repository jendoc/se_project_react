import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logoPath from "../../images/wtwr.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const Header = ({
  weatherData,
  loggedIn,
  openAddModal,
  openLoginModal,
  openRegisterModal,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  if (!weatherData) return null;

  return (
    <header className="header">
      <div className="header__container">
        <Link to={"/"}>
          <img src={logoPath} alt="WTWR Logo" className="header__logo" />
        </Link>
        <h2 className="header__location-data">
          {currentDate}, {weatherData.city}
        </h2>
        <ToggleSwitch />

        {loggedIn ? (
          <button className="header__btn" type="button" onClick={openAddModal}>
            + Add clothes
          </button>
        ) : (
          <button className="header__btn" onClick={openRegisterModal}>
            Sign up
          </button>
        )}

        {loggedIn ? (
          <Link
            to={"/profile"}
            className="header__profile-link"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            <h2 className="header__user-name">{currentUser.name}</h2>
            <img
              className="header__user-icon"
              src={currentUser.avatar}
              alt="User avatar"
            />
          </Link>
        ) : (
          <button className="header__btn" onClick={openLoginModal}>
            Log in
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
