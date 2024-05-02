# Project Title

A brief description of what this project does and who it's for.

## Project Features

- Filter Events by City.
- Show/HideEventDetails.
- Specify Number of Events.
- Use the App When Offline.
- Add a nApp Shortcut to the HomeScreen.
- Display Charts Visualizing Event Details.

### User Stories & Acceptance Criteria

1. Feature: Filter Events by City

User Story:

- AS a user, I WANT to be able to see events for a given city, SO THAT I can see the events that best apply to me.

Acceptance Criteria:

- GIVEN I haven't searched for a city yet, WHEN I view upcoming events, THEN I see upcoming events for all cities.
- GIVEN I am on the search page, WHEN I begin typing the name of a city, THEN I will see a list of possible cities that match what I have typed so far.
- GIVEN I have started typing a city name that matches at least one possible option, WHEN I click on one of the options, THEN I will be shown that cities meet-ups.

2. Feature: Show/Hide Event Details

User Story:

- AS a user, I WANT to be able to show and hide the details for a given event, SO THAT I can more easily navigate through pages that display many results.

Acceptance Criteria:

- GIVEN I have navigated to the upcoming events page, WHEN I view the list of results, THEN they will be collapsed by default.
- GIVEN I have navigated to the upcoming events page, WHEN I select a given event, THEN it will expand to show me the event details.
- GIVEN I have selected and event, AND the event is currently in expanded view, WHEN I select the event again, THEN the event will collapse again to hide the details.

3. Feature: Specify Number of Events

User Story:

- AS a user, I WANT to be able to specify the number of events that are displayed, SO THAT I can view more or fewer events on a single page based on my viewing preference.

Acceptance Criteria:

- GIVEN I have navigated to the upcoming events page, AND I have not yet specified a number of events to view, WHEN I scroll through the events, THEN I will see a maximum of 32 events displayed per page.
- GIVEN I have navigated to the upcoming events page, WHEN I specify a particular number X of events, then a maximum of X events will be displayed per page.

4. Feature: Use the App When Offline

User Story:

- As a user, I WANT to be able to use the app while offline, SO THAT I can I can see information about meetups I have found before even if I pass through an area where I lack internet connection.

Acceptance Criteria:

- GIVEN I have previously looked up information on meet-ups for a city, WHEN I use internet connection, THEN I will be able to see data for those meetups I have already found previously.

- GIVEN I am not connected to the internet, WHEN I search for a new city, THEN I will see an error message that informs me I will need to connect to the internet again to see information on new cities.

5. Feature: Add an App Shortcut to the Home Screen

User Story:

- AS a user, I WANT to be able add an app shortcut to my home screen, SO THAT I can more easily access the app in the future.

Acceptance Criteria:

- GIVEN I have an internet connection, ADD I am currently using the app, WHEN I select the appropriate link, THEN an app shortcut will be added to my home screen.

6. Feature: Display Charts Visualizing Event Details

User Story:

- AS a user, I WANT to see data on the number of events during a period of time in select cities, SO THAT I know which cities have the most events happening.

Acceptance Criteria:

- GIVEN I have selected at least one city, WHEN I access the app data page, THEN I will see the selected cities with number of events happening in each, AND I will see a data visualization that makes this clear at a glance.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them.

```bash
Give examples
```

### Installing

A step by step series of examples that tell you how to get a development environment running.

```bash
Describe how to install
```

## Running the tests

Explain how to run the automated tests for this system.

### Break down into end to end tests

Explain what these tests test and why.

```bash
Give an example
```

### And coding style tests

Explain what these tests test and why.

```bash
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system.

## Built With

- [React](https://reactjs.org/) - The web framework used
- [npm](https://npmjs.com/) - Dependency Management

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc

```

This adjusted template should now correctly reflect the hierarchical structure under "Getting Started."
```
