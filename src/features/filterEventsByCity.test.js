import { loadFeature, defineFeature } from "jest-cucumber";
import { render, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { getEvents } from "../api";

const feature = loadFeature("./src/features/filterEventsByCity.feature");

defineFeature(feature, (test) => {
  test("When user hasn't searched for a city, show upcoming events from all cities.", ({
    given,
    when,
    then,
  }) => {
    let AppComponent;
    given("user hasn't searched for any city", () => {});
    when("the user opens the app", async () => {
      AppComponent = render(<App />);
    });

    then("the user should see the list of all upcoming events.", async () => {
      await waitFor(() => {
        const AppDOM = AppComponent.container.firstChild;
        const EventListDOM = AppDOM.querySelector("#event-list");
        const EventListItems = within(EventListDOM).queryAllByRole("listitem");
        expect(EventListItems.length).toBe(32);
      });
    });
  });

  test("User should see a list of suggestions when they search for a city.", ({
    given,
    when,
    then,
  }) => {
    let AppComponent;
    let CitySearchDOM;

    given("the main page is open", async () => {
      AppComponent = render(<App />);
      await waitFor(() => {
        const AppDOM = AppComponent.container.firstChild;
        CitySearchDOM = AppDOM.querySelector("#city-search");
        expect(CitySearchDOM).toBeInTheDocument();
      });
    });

    when("user starts typing in the city textbox", async () => {
      const user = userEvent.setup();
      const citySearchInput = within(CitySearchDOM).queryByRole("textbox");
      await user.type(citySearchInput, "Berlin");
    });

    then(
      "the user should receive a list of cities (suggestions) that match what they've typed",
      () => {
        const suggestionListItems =
          within(CitySearchDOM).queryAllByRole("listitem");
        expect(suggestionListItems).toHaveLength(2);
      },
    );
  });

  test("User can select a city from the suggested list.", ({
    given,
    and,
    when,
    then,
  }) => {
    let AppComponent;
    let AppDOM;
    let CitySearchDOM;
    let citySearchInput;
    let suggestionListItems;
    given("user was typing “Berlin” in the city textbox", async () => {
      AppComponent = render(<App />);
      const user = userEvent.setup();
      await waitFor(() => {
        AppDOM = AppComponent.container.firstChild;
        CitySearchDOM = AppDOM.querySelector("#city-search");
        expect(CitySearchDOM).toBeInTheDocument();
      });
      citySearchInput = within(CitySearchDOM).queryByRole("textbox");
      await user.type(citySearchInput, "Berlin");
    });

    and("the list of suggested cities is showing", async () => {
      await waitFor(() => {
        suggestionListItems = within(CitySearchDOM).queryAllByRole("listitem");
        const suggestionsText = suggestionListItems.map(
          (item) => item.textContent,
        );
        expect(suggestionsText).toEqual(["Berlin, Germany", "See all cities"]);
      });
    });

    when(
      "the user selects a city (e.g., “Berlin, Germany”) from the list",
      async () => {
        const user = userEvent.setup();
        await user.click(suggestionListItems[0]);
      },
    );

    then(
      "their city should be changed to that city (i.e., “Berlin, Germany”)",
      () => {
        expect(citySearchInput.value).toBe("Berlin, Germany");
      },
    );

    and(
      "the user should receive a list of upcoming events in that city",
      async () => {
        const EventListDOM = AppDOM.querySelector("#event-list");
        const allEvents = await getEvents();
        const berlinEvents = allEvents.filter(
          (event) => event.location === citySearchInput.value,
        );
        await waitFor(() => {
          const EventListItems =
            within(EventListDOM).queryAllByRole("listitem");
          expect(EventListItems).toHaveLength(berlinEvents.length);
        });
      },
    );
  });
});
