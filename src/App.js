// src/App.js
import CitySearch from "./components/CitySearch";
import EventList from "./components/EventList";
import NumberOfEvents from "./components/NumberOfEvents";
import { useState } from "react";

import "./App.css";

const App = () => {
  const [numberOfEvents, setNumberOfEvents] = useState(32);
  return (
    <div className="App">
      <CitySearch />
      <EventList numberOfEvents={numberOfEvents} />
      <NumberOfEvents
        numberOfEvents={numberOfEvents}
        setNumberOfEvents={setNumberOfEvents}
      />
    </div>
  );
};

export default App;
