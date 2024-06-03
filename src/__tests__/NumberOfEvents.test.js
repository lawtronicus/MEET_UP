//src/__tests__CitySearch.test.js

import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NumberOfEvents from "../components/NumberOfEvents";

describe("<Number of Events /> component", () => {
  const numberOfEvents = "32";

  test("renders text input", () => {
    const NumberOfEventsComponent = render(
      <NumberOfEvents
        numberOfEvents={numberOfEvents}
        setCurrentNOE={() => {}}
      />,
    );
    const numberTextBox = NumberOfEventsComponent.queryByRole("textbox");
    expect(numberTextBox).toBeInTheDocument();
    expect(numberTextBox).toHaveClass("event-number");
  });

  test("default value is 32", () => {
    const NumberOfEventsComponent = render(
      <NumberOfEvents
        numberOfEvents={numberOfEvents}
        setCurrentNOE={() => {}}
      />,
    );
    const numberTextBox = NumberOfEventsComponent.queryByRole("textbox");
    expect(numberTextBox).toHaveValue("32");
  });
  test("value changes when a user types in it", async () => {
    const NumberOfEventsComponent = render(
      <NumberOfEvents
        numberOfEvents={numberOfEvents}
        setCurrentNOE={() => {}}
      />,
    );
    const user = userEvent.setup();
    const numberTextBox = NumberOfEventsComponent.queryByRole("textbox");
    await user.type(numberTextBox, "{backspace}{backspace}10");
    expect(numberTextBox).toHaveValue("10");
  });
});
