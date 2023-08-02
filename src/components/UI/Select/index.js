import React, { useEffect, useState } from "react";
import "./Select.scss";

export default function Select({
  options,
  onChangeSelect,
  value,
  defaultValue,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    setSelectedOption(value);
  }, [value]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const optionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChangeSelect(option);
  };

  return (
    <div className={`select ${isOpen ? "open" : ""}`}>
      <div className="select__header" onClick={toggleDropdown}>
        {selectedOption || `Select an option ${defaultValue}`}
      </div>
      {isOpen && (
        <ul className="select__options">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => optionSelect(option)}
              className={`select__option ${
                option === selectedOption ? "selected" : ""
              }`}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
