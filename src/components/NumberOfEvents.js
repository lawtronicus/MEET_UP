import { useState, useEffect } from "react";

const NumberOfEvents = ({ numberOfEvents, setCurrentNOE }) => {
  const [inputValue, setInputValue] = useState(numberOfEvents);

  useEffect(() => {
    setInputValue(numberOfEvents);
  }, [numberOfEvents]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setCurrentNOE(event.target.value);
  };

  return (
    <div id="number-of-events">
      <p>Number of Events:</p>
      <div className="gradient-wrapper">
        <input
          id="event-number-input"
          className="event-number"
          type="number"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default NumberOfEvents;
