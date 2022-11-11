import React from "react";
import "./Header.css";
import logoPath from "../images/wtwr.svg";
import iconPath from "../images/Avatar.svg";

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

const Header = ({ weatherData, openModal }) => {
  if (!weatherData) return null;

  return (
    <header className="header">
      <div className="header__container">
        <img src={logoPath} alt="WTWR Logo" className="header__logo" />
        <h2 className="header__location-data">
          {currentDate}, {weatherData.city}
        </h2>
        <button className="header__add-clothes-btn" type="button" onClick={openModal}>
          + Add clothes
        </button>
        <h2 className="header__user-name">Terrence Tegegne</h2>
        <img className="header__user-icon" src={iconPath} alt="User avatar" />
      </div>
    </header>
  );
};

export default Header;
