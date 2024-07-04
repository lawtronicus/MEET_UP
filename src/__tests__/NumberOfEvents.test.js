import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NumberOfEvents from "../components/NumberOfEvents";

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

describe("<Number of Events /> component", () => {
  const numberOfEvents = "32";

  test("renders text input", () => {
    const NumberOfEventsComponent = render(
      <NumberOfEvents
        numberOfEvents={numberOfEvents}
        setCurrentNOE={() => {}}
        setErrorAlert={() => {}}
      />,
    );
    const numberTextBox = NumberOfEventsComponent.queryByRole("spinbutton");
    expect(numberTextBox).toBeInTheDocument();
    expect(numberTextBox).toHaveClass("event-number");
  });

  test("default value is 32", () => {
    const NumberOfEventsComponent = render(
      <NumberOfEvents
        numberOfEvents={numberOfEvents}
        setCurrentNOE={() => {}}
        setErrorAlert={() => {}}
      />,
    );
    const numberTextBox = NumberOfEventsComponent.queryByRole("spinbutton");
    expect(numberTextBox).toHaveValue(32);
  });
  test("value changes when a user types in it", async () => {
    const NumberOfEventsComponent = render(
      <NumberOfEvents
        numberOfEvents={numberOfEvents}
        setCurrentNOE={() => {}}
        setErrorAlert={() => {}}
      />,
    );
    const user = userEvent.setup();
    const numberTextBox = NumberOfEventsComponent.queryByRole("spinbutton");
    await user.type(numberTextBox, "{backspace}{backspace}10");
    expect(numberTextBox).toHaveValue(10);
  });
});
