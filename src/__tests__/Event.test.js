import Event from "../components/Event";
import { render } from "@testing-library/react";
import { getEvents } from "../api";
import userEvent from "@testing-library/user-event";

describe("<Event /> component", () => {
  let EventComponent;

  beforeEach(async () => {
    const allEvents = await getEvents();
    EventComponent = render(<Event event={allEvents[0]} />);
  });

  test("renders event title", async () => {
    const allEvents = await getEvents();
    expect(
      EventComponent.queryByText(allEvents[0].summary)
    ).toBeInTheDocument();
  });

  test("renders event location", async () => {
    const allEvents = await getEvents();
    expect(
      EventComponent.queryByText(allEvents[0].location)
    ).toBeInTheDocument();
  });

  test("renders event details button with the title (show details)", () => {
    expect(EventComponent.queryByText("Show details")).toBeInTheDocument();
  });

  test("by default, event's details section is hidden", async () => {
    const allEvents = await getEvents();
    expect(
      EventComponent.queryByText(allEvents[0].description)
    ).not.toBeInTheDocument();
  });

  test("shows the details section when the user clicks on the 'show details' button", async () => {
    let allEvents = await getEvents();
    allEvents = allEvents.map((event) => ({
      ...event,
      description: event.description.replace(/\s+/g, " "),
    }));
    const user = userEvent.setup();
    const button = EventComponent.getByRole("button", { name: "Show details" });

    //check the details are NOT in the document before clicking and check button text
    expect(button.textContent).toBe("Show details");
    expect(
      EventComponent.queryByText(allEvents[0].description)
    ).not.toBeInTheDocument();

    await user.click(button);
    expect(
      await EventComponent.queryByText(allEvents[0].description)
    ).toBeInTheDocument();

    expect(button.textContent).toBe("Hide details");
  });

  test("hides the details section when the user clicks on the 'hide details' button", async () => {
    let allEvents = await getEvents();
    allEvents = allEvents.map((event) => ({
      ...event,
      description: event.description.replace(/\s+/g, " "),
    }));
    const user = userEvent.setup();
    const button = EventComponent.getByRole("button", { name: "Show details" });

    //check the details are NOT in the document before clicking
    expect(button.textContent).toBe("Show details");
    expect(
      EventComponent.queryByText(allEvents[0].description)
    ).not.toBeInTheDocument();

    await user.click(button);
    expect(
      await EventComponent.queryByText(allEvents[0].description)
    ).toBeInTheDocument();
    expect(button.textContent).toBe("Hide details");

    await user.click(button);
    expect(
      await EventComponent.queryByText(allEvents[0].description)
    ).not.toBeInTheDocument();
    expect(button.textContent).toBe("Show details");
  });
});
