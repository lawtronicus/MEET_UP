//src/__tests__CitySearch.test.js

import {
  render,
  within,
  cleanup,
  waitFor,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CitySearch from "../components/CitySearch";
import App from "../App";
import { extractLocations, getEvents } from "../api";
import mockData from "../mock-data";

describe("<CitySearch /> component", () => {
  let CitySearchComponent;
  beforeEach(() => {
    CitySearchComponent = render(
      <CitySearch
        allLocations={[]}
        setCurrentCity={() => {}}
        setInfoAlert={() => {}}
      />,
    );
  });

  afterEach(() => {
    cleanup();
  });

  test("renders text input", () => {
    const cityTextBox = CitySearchComponent.queryByRole("textbox");
    expect(cityTextBox).toBeInTheDocument();
    expect(cityTextBox).toHaveClass("city");
  });
  test("suggestions list is hidden by default", () => {
    const suggestionList = CitySearchComponent.queryByRole("list");
    expect(suggestionList).not.toBeInTheDocument();
  });

  test("renders a list of suggestions when city textbox gains focus", async () => {
    const user = userEvent.setup();
    const cityTextBox = CitySearchComponent.queryByRole("textbox");
    await user.click(cityTextBox);
    const suggestionList = CitySearchComponent.queryByRole("list");
    expect(suggestionList).toBeInTheDocument();
    expect(suggestionList).toHaveClass("suggestions");
  });

  test("updates list of suggestions correctly when user types in city textbox", async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);

    CitySearchComponent.rerender(
      <CitySearch
        allLocations={allLocations}
        setCurrentCity={() => {}}
        setInfoAlert={() => {}}
      />,
    );

    // user types "Berlin" in city textbox
    const cityTextBox = CitySearchComponent.queryByRole("textbox");
    await user.type(cityTextBox, "Berlin");

    // filter allLocations to locations matching "Berlin"
    const suggestions = allLocations
      ? allLocations.filter((location) => {
          return (
            location.toUpperCase().indexOf(cityTextBox.value.toUpperCase()) > -1
          );
        })
      : [];

    // get all <li> elements inside the suggestion list
    await waitFor(() => {
      const suggestionListItems =
        CitySearchComponent.queryAllByRole("listitem");
      expect(suggestionListItems).toHaveLength(suggestions.length + 1);
      for (let i = 0; i < suggestions.length; i += 1) {
        expect(suggestionListItems[i].textContent).toBe(suggestions[i]);
      }
    });
  });
  test("renders the suggestion text in the textbox upon clicking on the suggestion", async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    CitySearchComponent.rerender(
      <CitySearch
        allLocations={[]}
        setCurrentCity={() => {}}
        setInfoAlert={() => {}}
      />,
    );

    const cityTextBox = CitySearchComponent.queryByRole("textbox");
    await user.type(cityTextBox, "Berlin");

    const BerlinGermanySuggestion =
      CitySearchComponent.queryAllByRole("listitem")[0];

    await user.click(BerlinGermanySuggestion);

    expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
  });
});

describe("<CitySearch /> integration", () => {
  test("renders suggestions list when the app is rendered.", async () => {
    // Mocking API calls locally within this test
    jest
      .spyOn(require("../api"), "getAccessToken")
      .mockResolvedValue("mocked-token");
    jest.spyOn(require("../api"), "getEvents").mockResolvedValue(mockData);

    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    // Ensure the App component is rendered correctly
    expect(AppDOM).toBeInTheDocument();

    let CitySearchDOM;
    let cityTextBox;

    // Wait for the CitySearch component to be rendered
    await waitFor(() => {
      CitySearchDOM = AppDOM.querySelector("#city-search");
      cityTextBox = within(CitySearchDOM).queryByRole("textbox");
      expect(cityTextBox).toBeInTheDocument();
    });

    await user.click(cityTextBox);

    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);

    const suggestionListItems =
      within(CitySearchDOM).queryAllByRole("listitem");
    expect(suggestionListItems.length).toBe(allLocations.length + 1);
  });
});
