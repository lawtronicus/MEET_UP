// src/__tests__/App.test.js

import { render, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import * as api from "../api";

describe("<App /> component", () => {
  let AppComponent;

  beforeEach(async () => {
    AppComponent = render(<App />);
    await waitFor(() =>
      expect(
        AppComponent.container.querySelector(".user-controls"),
      ).toBeInTheDocument(),
    );
  });

  test("authenticates user and fetches events", async () => {
    await waitFor(() => {
      expect(
        AppComponent.container.querySelector("#event-list"),
      ).toBeInTheDocument();
    });
  });

  test("renders CitySearch", async () => {
    await waitFor(() => {
      expect(
        AppComponent.container.querySelector("#city-search"),
      ).toBeInTheDocument();
    });
  });

  test("renders NumberOfEvents", async () => {
    await waitFor(() => {
      expect(
        AppComponent.container.querySelector("#number-of-events"),
      ).toBeInTheDocument();
    });
  });
});

describe("<App /> integration", () => {
  test("renders a list of events matching the city selected by the user", async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    let CitySearchDOM;
    let CitySearchInput;
    await waitFor(() =>
      expect(
        AppComponent.container.querySelector(".user-controls"),
      ).toBeInTheDocument(),
    );
    await waitFor(() => {
      CitySearchDOM = AppComponent.container.querySelector("#city-search");
      CitySearchInput = within(CitySearchDOM).queryByRole("textbox");
    });

    await user.type(CitySearchInput, "Berlin");
    const berlinSuggestionItem =
      within(CitySearchDOM).queryByText("Berlin, Germany");
    await user.click(berlinSuggestionItem);

    const EventListDOM = AppComponent.container.querySelector("#event-list");
    await waitFor(() => expect(EventListDOM).toBeInTheDocument());
    const allRenderedEventItems =
      within(EventListDOM).queryAllByRole("listitem");

    const allEvents = await api.getEvents();
    const berlinEvents = allEvents.filter(
      (event) => event.location === "Berlin, Germany",
    );

    expect(allRenderedEventItems.length).toBe(berlinEvents.length);
    allRenderedEventItems.forEach((event) => {
      expect(event.textContent).toContain("Berlin, Germany");
    });
  });

  test("changes the number of events in the event list based on the number typed in the NOE input by the user", async () => {
    const user = userEvent.setup();
    let EventListDOM;
    let NumberOfEventsDOM;
    let numberTextBox;
    const AppComponent = render(<App />);

    await waitFor(() =>
      expect(
        AppComponent.container.querySelector(".user-controls"),
      ).toBeInTheDocument(),
    );

    await waitFor(() => {
      EventListDOM = AppComponent.container.querySelector("#event-list");
      NumberOfEventsDOM =
        AppComponent.container.querySelector("#number-of-events");
      numberTextBox = within(NumberOfEventsDOM).queryByRole("spinbutton");

      expect(EventListDOM).toBeInTheDocument();
      expect(NumberOfEventsDOM).toBeInTheDocument();
      expect(numberTextBox).toBeInTheDocument();
    });

    await user.click(numberTextBox);
    await user.clear(numberTextBox);
    await user.type(numberTextBox, "10");

    await waitFor(() => {
      const EventListItems = within(EventListDOM).queryAllByRole("listitem");
      expect(EventListItems.length).toBe(10);
    });
  });
});
