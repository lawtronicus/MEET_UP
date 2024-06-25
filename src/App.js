// src/App.js
import { useEffect, useState } from "react";
import CitySearch from "./components/CitySearch";
import EventList from "./components/EventList";
import NumberOfEvents from "./components/NumberOfEvents";
import { extractLocations, getEvents } from "./api";
import "./App.css";

const App = () => {
  const [numberOfEvents, setNumberOfEvents] = useState(32);
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");

  useEffect(() => {
    fetchData();
  }, [currentCity, currentNOE]);

  const fetchData = async () => {
    const allEvents = await getEvents();
    if (!allEvents) {
      // Handle the case when getEvents returns undefined or null
      console.error("Failed to fetch events.");
      return;
    }

    const filteredEvents =
      currentCity === "See all cities"
        ? allEvents
        : allEvents.filter((event) => event.location === currentCity);
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  };

  return (
    <div className="App">
      <div className="user-controls">
        <div className="title">
          <h1 id="page-title">Find Your CareerFoundry Event!</h1>
        </div>
        <CitySearch
          allLocations={allLocations}
          setCurrentCity={setCurrentCity}
        />
        <NumberOfEvents
          numberOfEvents={numberOfEvents}
          setCurrentNOE={setCurrentNOE}
        />
      </div>
      <EventList numberOfEvents={numberOfEvents} events={events} />
    </div>
  );
};

export default App;
