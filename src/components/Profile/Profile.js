import "../../blocks/Profile/Profile.css";
import React from "react";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

function Profile({ defaultClothing, handleCardClick, openModal }) {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection
        defaultClothing={defaultClothing}
        handleCardClick={handleCardClick}
        openModal={openModal}
      />
    </div>
  );
}

export default Profile;
