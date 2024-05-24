// src/components/Event.js
import { useState } from "react";

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);
  const handleButtonClick = () => {
    setShowDetails((currentShowDetails) => !currentShowDetails);
  };
  return (
    <li>
      <div>
        <h2>{event.summary}</h2>
        <p>{event.location}</p>
        {showDetails ? <p>{event.description}</p> : null}
        <button onClick={handleButtonClick}>
          {showDetails ? "Hide details" : "Show details"}
        </button>
      </div>
    </li>
  );
};

export default Event;
