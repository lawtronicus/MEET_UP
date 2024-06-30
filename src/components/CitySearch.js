import { useState, useEffect } from "react";

const CitySearch = ({ allLocations, setCurrentCity, setInfoAlert }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    console.log("CitySearch input changed:", value);

    const filteredLocations = allLocations
      ? allLocations.filter((location) => {
          return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        })
      : [];
    setQuery(value);
    setSuggestions(filteredLocations);

    let infoText;
    if (filteredLocations.length === 0) {
      infoText =
        "We can not find the city you are looking for. Please try another city";
    } else {
      infoText = "";
    }
    setInfoAlert(infoText);
    console.log("InfoAlert text set to:", infoText);
  };

  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    console.log("City selected:", value);

    setQuery(value);
    setShowSuggestions(false);
    setCurrentCity(value);
    setInfoAlert("");
  };

  useEffect(() => {
    setSuggestions(allLocations);
    console.log(
      "CitySearch useEffect triggered with allLocations:",
      allLocations,
    );
  }, [allLocations]);

  return (
    <div id="city-search">
      <p>City:</p>
      <div className="gradient-wrapper">
        <input
          type="text"
          className="city"
          value={query}
          placeholder="Search for a city"
          onFocus={() => setShowSuggestions(true)}
          onChange={handleInputChanged}
        />
      </div>
      {showSuggestions ? (
        <ul className="suggestions">
          {suggestions.map((suggestion) => {
            return (
              <li onClick={handleItemClicked} key={suggestion}>
                {suggestion}
              </li>
            );
          })}
          <li key="See all cities" onClick={handleItemClicked}>
            <b>See all cities</b>
          </li>
        </ul>
      ) : null}
    </div>
  );
};

export default CitySearch;
