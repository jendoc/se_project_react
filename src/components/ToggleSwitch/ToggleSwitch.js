import React, { useContext, useEffect, useState } from "react";
import "./ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  const [isChecked, setIsChecked] = useState(currentTemperatureUnit === "C");

  const [fahrenheitColor, setFahrenheitColor] = useState("");
  const [celciusColor, setCelciusColor] = useState("");

  useEffect(
    () => setIsChecked(currentTemperatureUnit === "C"),
    [currentTemperatureUnit]
  );

  useEffect(() => {
    if (currentTemperatureUnit === "F") {
      setFahrenheitColor("white");
    } else {
      setFahrenheitColor("#7e7e7e");
    }
  }, [currentTemperatureUnit]);
  
  useEffect(() => {
    if (currentTemperatureUnit === "C") {
      setCelciusColor("white");
    } else {
      setCelciusColor("#7e7e7e");
    }
  }, [currentTemperatureUnit]);

  return (
    <div className="toggle-switch">
      <label className="toggle-switch__label" htmlFor="toggle-switch">
        <p className="toggle-switch__label_fahrenheit" style={{color: fahrenheitColor}}>F</p>
        <p className="toggle-switch__label_celcius" style={{color: celciusColor}}>C</p>
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
