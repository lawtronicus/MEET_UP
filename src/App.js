import { useEffect, useState } from "react";
import CitySearch from "./components/CitySearch";
import EventList from "./components/EventList";
import NumberOfEvents from "./components/NumberOfEvents";
import { extractLocations, getEvents, getAccessToken } from "./api";
import InfoAlert from "./components/InfoAlert";
import ErrorAlert from "./components/ErrorAlert";
import "./App.css";

const App = () => {
  const [numberOfEvents] = useState(32);
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");

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

  const fetchData = async (token) => {
    const allEvents = await getEvents(token);
    if (!allEvents) {
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
      <div className="alerts-container">
        {infoAlert.length > 0 && <InfoAlert text={infoAlert} />}
        {errorAlert.length > 0 && <ErrorAlert text={errorAlert} />}
      </div>
      <div className="user-controls">
        <div className="title">
          <h1 id="page-title">Find Your Event!</h1>
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
              setErrorAlert={setErrorAlert}
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
