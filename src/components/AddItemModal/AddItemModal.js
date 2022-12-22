import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ isOpen, onAddItem, closeModal }) => {
  const [name, setName] = useState("");
  const [clothingItems, setClothingItems] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [weatherType, setWeatherType] = useState("");

  useEffect(() => {
    setName("");
    setImageUrl("");
    setWeatherType(null);
  }, [isOpen]);

  const handleNameChange = (evt) => {
    setName(evt.target.value);
  };

  const handleImageUrlChange = (evt) => {
    setImageUrl(evt.target.value);
  };

  const handleWeatherChange = (evt) => {
    setWeatherType(evt.target.value);
  };

  const handleSumbit = (evt) => {
    evt.preventDefault();
    onAddItem(name, imageUrl, weatherType);
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      type="add"
      title="New garment"
      buttonText="Add garment"
      onClose={closeModal}
      onSubmit={handleSumbit}
    >
      <h4 className="form__label">Name</h4>
      <input
        onChange={handleNameChange}
        className="form__input form__input_type_name"
        name="name"
        type="text"
        placeholder="Name"
        minLength="1"
        maxLength="40"
        required
      />
      <h4 className="form__label">Image</h4>
      <input
        onChange={handleImageUrlChange}
        className="form__input form__input_type_image"
        name="image"
        type="url"
        placeholder="Image URL"
        required
      />
      <h4 className="form__label">Select the weather type:</h4>
      <div className="form__radio-container">
        <div className="form__radio">
          <input
            onChange={handleWeatherChange}
            checked={weatherType === "hot"}
            className="form__input_radio"
            name="temp"
            value="Hot"
            type="radio"
            id="hot"
          />
          <label className="form__label_radio" htmlFor="hot">
            Hot
          </label>
        </div>
        <div className="form__radio">
          <input
            onChange={handleWeatherChange}
            checked={weatherType === "warm"}
            className="form__input_radio"
            name="temp"
            value="Warm"
            type="radio"
            id="warm"
          />
          <label className="form__label_radio" htmlFor="warm">
            Warm
          </label>
        </div>
        <div className="form__radio">
          <input
            onChange={handleWeatherChange}
            checked={weatherType === "cold"}
            className="form__input_radio"
            name="temp"
            value="Cold"
            type="radio"
            id="cold"
          />
          <label className="form__label_radio" htmlFor="cold">
            Cold
          </label>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;
