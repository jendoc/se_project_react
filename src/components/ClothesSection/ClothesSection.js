import "./ClothesSection.css";
import React from "react";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ClothesSection({ clothingItems, handleCardClick, openAddModal, isLoggedIn }) {  

  return (
    <div className="profile__clothes-section">
      <div className="profile__clothes-section-header">
      <h2 className="profile__clothes-section-title">Your items</h2>
      <button
        className="profile__add-clothes-btn"
        type="button"
        onClick={openAddModal}
      >
        + Add new
      </button>
      </div>
      <ul className="profile__clothes-section-items">
        {clothingItems.map((item) => (
          <ItemCard
            clothingOption={item}
            key={item._id}
            onClick={() => handleCardClick(item)}
            isLoggedIn={isLoggedIn}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
