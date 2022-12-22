import "../../blocks/ClothesSection/ClothesSection.css";
import React from "react";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ clothingItems, handleCardClick, openModal }) {
  return (
    <div className="profile__clothes-section">
      <div className="profile__clothes-section-header">
      <h2 className="profile__clothes-section-title">Your items</h2>
      <button
        className="profile__add-clothes-btn"
        type="button"
        onClick={openModal}
      >
        + Add new
      </button>
      </div>
      <ul className="profile__clothes-section-items">
        {clothingItems.map((item) => (
          <ItemCard
            isOpen="false"
            clothingOption={item}
            key={item._id}
            name={item.name}
            image={item.link}
            weather={item.weather}
            onClick={() => handleCardClick(item)}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
