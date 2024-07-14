import userEvent from "@testing-library/user-event";
import { render } from "@testing-library/react";
import Event from "../components/Event";
import mockData from "../mock-data"; // Import mock data
import * as api from "../api"; // Import everything from api

jest.mock("../api", () => ({
  getEvents: jest.fn(), // We will define this mock later
  getAccessToken: jest.fn(() => Promise.resolve("mocked-token")),
}));

describe("<Event /> component", () => {
  let EventComponent;
  let event;

  beforeEach(async () => {
    api.getEvents.mockResolvedValueOnce(mockData); // Mock getEvents to return mock data
    const allEvents = await api.getEvents(); // Log to verify the events
    event = allEvents[0]; // Store the first event
    EventComponent = render(<Event event={event} />);
  });

  test("renders event title", async () => {
    expect(EventComponent.queryByText(event.summary)).toBeInTheDocument();
  });

  test("renders event location", async () => {
    expect(EventComponent.queryByText(event.location)).toBeInTheDocument();
  });

  test("renders event details button with the title (show details)", () => {
    expect(EventComponent.queryByText("Show details")).toBeInTheDocument();
  });

  test("by default, event's details section is hidden", async () => {
    expect(
      EventComponent.queryByText(
        (content, element) =>
          element.tagName.toLowerCase() === "p" &&
          content.startsWith(event.description.split(" ")[0]),
      ),
    ).not.toBeInTheDocument();
  });

  test("shows the details section when the user clicks on the 'show details' button", async () => {
    const user = userEvent.setup();
    const button = EventComponent.getByRole("button", { name: "Show details" });
    expect(button.textContent).toBe("Show details");
    expect(
      EventComponent.queryByText(
        (content, element) =>
          element.tagName.toLowerCase() === "p" &&
          content.startsWith(event.description.split(" ")[0]),
      ),
    ).not.toBeInTheDocument();

    await user.click(button);
    expect(
      await EventComponent.findByText(
        (content, element) =>
          element.tagName.toLowerCase() === "p" &&
          content.startsWith(event.description.split(" ")[0]),
      ),
    ).toBeInTheDocument();

    expect(button.textContent).toBe("Hide details");
  });

  test("hides the details section when the user clicks on the 'hide details' button", async () => {
    const user = userEvent.setup();
    const button = EventComponent.getByRole("button", { name: "Show details" });

    expect(button.textContent).toBe("Show details");
    expect(
      EventComponent.queryByText(
        (content, element) =>
          element.tagName.toLowerCase() === "p" &&
          content.startsWith(event.description.split(" ")[0]),
      ),
    ).not.toBeInTheDocument();

    await user.click(button);
    expect(
      await EventComponent.findByText(
        (content, element) =>
          element.tagName.toLowerCase() === "p" &&
          content.startsWith(event.description.split(" ")[0]),
      ),
    ).toBeInTheDocument();
    expect(button.textContent).toBe("Hide details");

    await user.click(button);
    expect(
      EventComponent.queryByText(
        (content, element) =>
          element.tagName.toLowerCase() === "p" &&
          content.startsWith(event.description.split(" ")[0]),
      ),
    ).not.toBeInTheDocument();
    expect(button.textContent).toBe("Show details");
  });
});
