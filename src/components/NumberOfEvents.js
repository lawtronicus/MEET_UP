import { useState, useEffect, useRef } from "react";

const NumberOfEvents = ({ numberOfEvents, setCurrentNOE, setErrorAlert }) => {
  const [inputValue, setInputValue] = useState(numberOfEvents);
  const debounceTimerRef = useRef(null);

  useEffect(() => {
    setInputValue(numberOfEvents);
  }, [numberOfEvents]);

  const validateNumberInput = (value) => {
    const num = parseInt(value, 10);
    return !Number.isNaN(num) && num >= 1 && num <= 100;
  };

  const handleInputChange = (event) => {
    let errorText;
    const value = event.target.value;
    setInputValue(value);

    // Capture the value within the closure
    const validatedValue = value;
    if (validateNumberInput(validatedValue)) {
      errorText = "";
      setCurrentNOE(validatedValue);
    } else {
      errorText = "Please input a number between 0 and 100.";
    }
    setErrorAlert(errorText);
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
      </div>
    </div>
  );
};

export default NumberOfEvents;
