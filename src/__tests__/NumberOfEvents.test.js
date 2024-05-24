//src/__tests__CitySearch.test.js

import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NumberOfEvents from "../components/NumberOfEvents";

describe("<Number of Events /> component", () => {
  const numberOfEvents = "32";

  test("renders text input", () => {
    const NumberOfEventsComponent = render(
      <NumberOfEvents numberOfEvents={numberOfEvents} />
    );
    const numberTextBox = NumberOfEventsComponent.queryByRole("textbox");
    expect(numberTextBox).toBeInTheDocument();
    expect(numberTextBox).toHaveClass("event-number");
  });

  test("default value is 32", () => {
    const NumberOfEventsComponent = render(
      <NumberOfEvents numberOfEvents={numberOfEvents} />
    );
    const numberTextBox = NumberOfEventsComponent.queryByRole("textbox");
    expect(numberTextBox).toHaveValue("32");
  });
  test("value changes when a user types in it", async () => {
    const NumberOfEventsComponent = render(
      <NumberOfEvents numberOfEvents={numberOfEvents} />
    );
    const user = userEvent.setup();
    const numberTextBox = NumberOfEventsComponent.queryByRole("textbox");
    await user.type(numberTextBox, "{backspace}{backspace}10");
    expect(numberTextBox).toHaveValue("10");
  });
});

//A test in NumberOfEvents.test.js to ensure that the value of the NumberOfEvents component’s textbox has a value that changes accordingly when a user .type()s in it. (Note: If you want to simulate pressing backspace twice and then typing 10, you would write the code await user.type(TextInput_Reference_Variable, '{backspace}{backspace}10');).
