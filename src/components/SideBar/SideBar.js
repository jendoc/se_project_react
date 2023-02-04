import "./SideBar.css";
import React from "react";
import iconPath from "../../images/Avatar.svg";

function SideBar({}) {
  return (
    <div className="profile__info">
      <img className="profile__user-icon" src={iconPath} alt="User avatar" />
      <h2 className="profile__user-name">Terrence Tegegne</h2>
    </div>
  );
}

export default SideBar;
