import { useEffect, useState } from "react";
import CitySearch from "./components/CitySearch";
import EventList from "./components/EventList";
import NumberOfEvents from "./components/NumberOfEvents";
import { extractLocations, getEvents, getAccessToken } from "./api";
import InfoAlert from "./components/InfoAlert";
import "./App.css";

const App = () => {
  const [numberOfEvents, setNumberOfEvents] = useState(32);
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [infoAlert, setInfoAlert] = useState("");

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = await getAccessToken();
      if (token) {
        setIsAuthenticated(true);
        fetchData(token);
      }
    };
    checkAuthentication();
  }, [currentCity, currentNOE]);

  const fetchData = async () => {
    const allEvents = await getEvents();
    if (!allEvents) {
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

  useEffect(() => {
    console.log("InfoAlert state updated:", infoAlert);
  }, [infoAlert]);

  return (
    <div className="App">
      {console.log("Rendering App component")}
      <div className="alerts-container">
        {infoAlert.length > 0 && <InfoAlert text={infoAlert} />}
      </div>
      <div className="user-controls">
        <div className="title">
          <h1 id="page-title">Find Your CareerFoundry Event!</h1>
        </div>
        {isAuthenticated && (
          <>
            <CitySearch
              allLocations={allLocations}
              setCurrentCity={setCurrentCity}
              setInfoAlert={setInfoAlert}
            />
            <NumberOfEvents
              numberOfEvents={numberOfEvents}
              setCurrentNOE={setCurrentNOE}
            />
          </>
        )}
      </div>
      {isAuthenticated && (
        <EventList numberOfEvents={numberOfEvents} events={events} />
      )}
    </div>
  );
};

export default App;
