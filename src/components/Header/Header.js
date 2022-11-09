import React from "react";
import "./Header.css";
import logoPath from "../images/wtwr.svg";
import iconPath from "../images/Avatar.svg";

const currentDate = new Date().toLocaleString('default', {month: 'long', day: 'numeric'});

const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <img src={logoPath} alt="WTWR Logo" className="header__logo" />
        <h2 className="header__location-data">{currentDate}, Portland</h2>
        <button className="header__add-clothes-btn">+ Add clothes</button>
        <h2 className="header__user-name">Terrence Tegegne</h2>
        <img className="header__user-icon" src={iconPath} />
      </div>
    </header>
  );
};

export default Header;
