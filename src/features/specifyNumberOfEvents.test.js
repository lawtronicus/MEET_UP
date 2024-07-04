import { loadFeature, defineFeature } from "jest-cucumber";
import { render, within, waitFor } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

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
  };
});

defineFeature(feature, (test) => {
  test("Default number of events displayed is 32", ({
    given,
    and,
    when,
    then,
  }) => {
    let AppComponent;
    let EventListDOM;

    given("I have navigated to the upcoming events page", () => {
      AppComponent = render(<App />);
    });

    and("I have not yet specified a number of events to view", () => {
      // No action needed as it's the default state
    });

    when("I scroll through the events", () => {
      EventListDOM = AppComponent.container.querySelector("#event-list");
    });

    then("I will see a maximum of 32 events displayed per page", async () => {
      await waitFor(() => {
        const EventItems = within(EventListDOM).queryAllByRole("listitem");
        expect(EventItems.length).toBeLessThanOrEqual(32);
      });
    });
  });

  test("User specifies a number of events to display", ({
    given,
    when,
    then,
  }) => {
    let AppComponent;
    let EventListDOM;
    let NumberInput;

    given("I have navigated to the upcoming events page", () => {
      AppComponent = render(<App />);
    });

    when("I specify a particular number X of events", async () => {
      const user = userEvent.setup();
      NumberInput = AppComponent.container.querySelector("#event-number-input");
      await user.clear(NumberInput);
      await user.type(NumberInput, "5");
    });

    then("a maximum of X events will be displayed per page", async () => {
      EventListDOM = AppComponent.container.querySelector("#event-list");
      await waitFor(() => {
        const EventItems = within(EventListDOM).queryAllByRole("listitem");
        expect(EventItems.length).toBeLessThanOrEqual(5);
      });
    });
  });
});
