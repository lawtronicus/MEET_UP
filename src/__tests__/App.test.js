// src/__tests__/App.test.js

import { render, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import mockData from "../mock-data"; // Import mock data
import * as api from "../api"; // Import everything from api

jest.mock("react", () => {
  const originalModule = jest.requireActual("react");
  return {
    ...originalModule,
    useState: (initialValue) => {
      if (initialValue === false) {
        return [true, jest.fn()];
      }
      return originalModule.useState(initialValue);
    },
  };
});

jest.mock("../api", () => {
  const originalModule = jest.requireActual("../api");
  return {
    ...originalModule,
    getAccessToken: jest.fn(() => Promise.resolve("mocked-token")),
    getEvents: jest.fn(() => Promise.resolve(mockData)),
  };
});

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
  beforeEach(async () => {
    api.getEvents.mockResolvedValue(mockData); // Mock getEvents to return mock data
    api.getAccessToken.mockResolvedValue("mocked-token"); // Ensure getAccessToken resolves to the mocked token
  });

  test("renders a list of events matching the city selected by the user", async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    await waitFor(() =>
      expect(
        AppComponent.container.querySelector(".user-controls"),
      ).toBeInTheDocument(),
    );

    const CitySearchDOM = AppComponent.container.querySelector("#city-search");
    const CitySearchInput = within(CitySearchDOM).queryByRole("textbox");

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
    const AppComponent = render(<App />);
    await waitFor(() =>
      expect(
        AppComponent.container.querySelector(".user-controls"),
      ).toBeInTheDocument(),
    );

    const EventListDOM = AppComponent.container.querySelector("#event-list");
    await waitFor(() => expect(EventListDOM).toBeInTheDocument());
    const NumberOfEventsDOM =
      AppComponent.container.querySelector("#number-of-events");
    const numberTextBox = within(NumberOfEventsDOM).queryByRole("spinbutton");

    await user.clear(numberTextBox);

    await user.type(numberTextBox, "10");

    await waitFor(() => {
      const EventListItems = within(EventListDOM).queryAllByRole("listitem");
      expect(EventListItems.length).toBe(10);
    });
  });
});
