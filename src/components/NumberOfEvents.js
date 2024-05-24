import { useState, useEffect } from "react";

const NumberOfEvents = ({ numberOfEvents }) => {
  const [inputValue, setInputValue] = useState(numberOfEvents);

  useEffect(() => {
    setInputValue(numberOfEvents);
  }, [numberOfEvents]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div id="number-of-events">
      <input
        className="event-number"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default NumberOfEvents;
