import React, { useEffect, useState, useMemo } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ isOpen, onAddItem, onCloseModal, isLoading }) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  useEffect(() => {
    setName("");
    setImageUrl("");
    setWeather("");
  }, [isOpen]);

  const isValid = useMemo(() => {
    return name.length >= 2 && imageUrl.length >= 1;
  }, [name, imageUrl, weather]);

  const handleNameChange = (evt) => {
    setName(evt.target.value);
  };

  const handleImageUrlChange = (evt) => {
    setImageUrl(evt.target.value);
  };

  const handleWeatherChange = (evt) => {
    setWeather(evt.target.value);
  };

  const handleSumbit = (evt) => {
    evt.preventDefault();
    onAddItem(name, imageUrl, weather);
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      type="add"
      title="New garment"
      buttonText={isLoading ? "Adding..." : "Add garment"}
      onCloseModal={onCloseModal}
      onSubmit={handleSumbit}
      onAddItem={onAddItem}
      disabled={!isValid}
    >
      <h4 className="form__label">Name</h4>
      <input
        onChange={handleNameChange}
        className="form__input form__input_type_name"
        name="name"
        type="text"
        value={name}
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
        value={imageUrl}
        placeholder="Image URL"
        required
      />
      <h4 className="form__label">Select the weather type:</h4>
      <div className="form__radio-container">
        <div className="form__radio">
          <input
            type="radio"
            onChange={handleWeatherChange}
            checked={weather === "hot"}
            className="form__input_radio"
            name={weather}
            value="hot"
            id="hot"
          />
          <label className="form__label_radio" htmlFor="hot">
            Hot
          </label>
        </div>
        <div className="form__radio">
          <input
            type="radio"
            onChange={handleWeatherChange}
            checked={weather === "warm"}
            className="form__input_radio"
            name={weather}
            value="warm"
            id="warm"
          />
          <label className="form__label_radio" htmlFor="warm">
            Warm
          </label>
        </div>
        <div className="form__radio">
          <input
            type="radio"
            onChange={handleWeatherChange}
            checked={weather === "cold"}
            className="form__input_radio"
            name={weather}
            value="cold"
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
