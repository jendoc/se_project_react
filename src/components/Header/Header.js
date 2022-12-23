import React from "react";
import { Link } from "react-router-dom";
import "../../blocks/Header/Header.css";
import logoPath from "../../images/wtwr.svg";
import iconPath from "../../images/Avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

const Header = ({ weatherData, openModal }) => {
  if (!weatherData) return null;

  return (
    <header className="header">
      <div className="header__container">
        <Link to={'/'}>
        <img src={logoPath} alt="WTWR Logo" className="header__logo" />
        </Link>
        <h2 className="header__location-data">
          {currentDate}, {weatherData.city}
        </h2>
        <ToggleSwitch
        />
        <button
          className="header__add-clothes-btn"
          type="button"
          onClick={openModal}
        >
          + Add clothes
        </button>
        <Link to={'/profile'} className="header__profile-link" style={{textDecoration: 'none', display: 'flex', alignItems: 'center'}}>
        <h2 className="header__user-name">Terrence Tegegne</h2>
        <img className="header__user-icon" src={iconPath} alt="User avatar" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
