import { useState, useEffect, useRef } from "react";

const NumberOfEvents = ({ numberOfEvents, setCurrentNOE }) => {
  const [inputValue, setInputValue] = useState(numberOfEvents);
  const [error, setError] = useState("");
  const debounceTimerRef = useRef(null);

  useEffect(() => {
    setInputValue(numberOfEvents);
  }, [numberOfEvents]);

  const validateNumberInput = (value) => {
    const num = parseInt(value, 10);
    return !Number.isNaN(num) && num >= 1 && num <= 100;
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => {
      if (validateNumberInput(value)) {
        setError("");
        setCurrentNOE(value);
      } else {
        setError("Please enter a number between 1 and 100.");
      }
    }, 300);
  };

  return (
    <div id="number-of-events">
      <p>Number of Events:</p>
      <div className="gradient-wrapper">
        <input
          id="event-number-input"
          className="event-number"
          type="number"
          min="1"
          max="100"
          value={inputValue}
          onChange={handleInputChange}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default NumberOfEvents;
