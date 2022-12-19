import React, { useContext, useEffect, useState } from "react";
import "../../blocks/ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  const [isChecked, setIsChecked] = useState(currentTemperatureUnit === "C");
  useEffect(
    () => setIsChecked(currentTemperatureUnit === "C"),
    [currentTemperatureUnit]
  );

  return (
    <div className="toggle-switch">
      <label className="toggle-switch__label" htmlFor="toggle-switch">
        <p className="toggle-switch__fahrenheit">F</p>
        <p className="toggle-switch__celcius">C</p>
        <input
          type="checkbox"
          className="toggle-switch__checkbox"
          id="toggle-switch"
          value={currentTemperatureUnit}
          onChange={handleToggleSwitchChange}
          checked={isChecked}
        />
        <span className={`toggle-switch__button`}></span>
      </label>
    </div>
  );
};

export default ToggleSwitch;
