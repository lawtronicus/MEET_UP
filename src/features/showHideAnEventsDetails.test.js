import { loadFeature, defineFeature } from "jest-cucumber";
import { render, within, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

defineFeature(feature, (test) => {
  test("When a user opens the app and views the list of events, all events will be collapsed.", ({
    given,
    when,
    then,
  }) => {
    let AppComponent;
    let EventListDOM;

    given("user has started the app", async () => {
      jest
        .spyOn(require("../api"), "getAccessToken")
        .mockResolvedValue("mocked-token");

      AppComponent = render(<App />);
      await waitFor(() => {
        EventListDOM = AppComponent.container.querySelector("#event-list");
        expect(EventListDOM).toBeInTheDocument();
      });
    });

    when("user views the list of events", async () => {
      EventListDOM = AppComponent.container.querySelector("#event-list");
    });

    then("the events will be collapsed by default.", () => {
      const EventItems = within(EventListDOM).queryAllByRole("listitem");
      EventItems.forEach((event) => {
        const eventInfo = within(event).queryByText("Hide details");
        expect(eventInfo).toBeNull();
      });
    });
  });

  test('When a user clicks the "details" button, the event will expand to show the event details', ({
    given,
    when,
    then,
  }) => {
    let AppComponent;
    let EventListDOM;
    let EventItem;
    let DetailsButton;

    given("user has started the app", async () => {
      jest
        .spyOn(require("../api"), "getAccessToken")
        .mockResolvedValue("mocked-token");

      AppComponent = render(<App />);
      await waitFor(() => {
        EventListDOM = AppComponent.container.querySelector("#event-list");
        expect(EventListDOM).toBeInTheDocument();
      });
      await waitFor(() => {
        EventItem = within(EventListDOM).queryAllByRole("listitem")[0];
        DetailsButton = within(EventItem).queryByRole("button", {
          name: /show details/i,
        });
        expect(DetailsButton).toBeInTheDocument();
      });
    });

    when("user clicks details button on an event", async () => {
      const user = userEvent.setup();
      await user.click(DetailsButton);
    });

    then("the event will expand to reveal details", async () => {
      await waitFor(() => {
        const EventDetails = within(EventItem).queryByText("Hide details");
        expect(EventDetails).toBeInTheDocument();
      });
    });
  });

  test('When a user clicks the "hide" button on an expanded event, the event will collapse again to hide the details.', ({
    given,
    and,
    when,
    then,
  }) => {
    let AppComponent;
    let EventListDOM;
    let EventItem;
    let DetailsButton;

    given("user has started the app", async () => {
      jest
        .spyOn(require("../api"), "getAccessToken")
        .mockResolvedValue("mocked-token");

      AppComponent = render(<App />);
      await waitFor(() => {
        EventListDOM = AppComponent.container.querySelector("#event-list");
        expect(EventListDOM).toBeInTheDocument();
      });
      EventListDOM = AppComponent.container.querySelector("#event-list");
      await waitFor(() => {
        EventItem = within(EventListDOM).queryAllByRole("listitem")[0];
        DetailsButton = within(EventItem).queryByRole("button", {
          name: /show details/i,
        });
        expect(DetailsButton).toBeInTheDocument();
      });
    });

    and("user has clicked details on an event", async () => {
      const user = userEvent.setup();
      await user.click(DetailsButton);
    });

    when("user clicks hide button", async () => {
      const user = userEvent.setup();
      const HideButton = within(EventItem).queryByRole("button", {
        name: /hide details/i,
      });
      await user.click(HideButton);
    });

    then("the event will collapse", () => {
      const EventDetails = within(EventItem).queryByText("Hide details");
      expect(EventDetails).toBeNull();
    });
  });
});
