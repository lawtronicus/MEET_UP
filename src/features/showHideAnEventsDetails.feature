Feature: Show or Hide an Events details

Scenario: When a user opens the app and views the list of events, all events will be collapsed.
  Given user has started the app
  When user views the list of events
  Then the events will be collapsed by default.

Scenario: When a user clicks the 'details' button, the event will expand to show the event details
  Given user has started the app
  When user clicks details button on an event
  Then the event will expand to reveal details

 Scenario: When a user clicks the 'hide' button on an expanded event, the event will collapse again to hide the details.
  Given user has started the app
  And user has clicked details on an event
  When user clicks hide button
  Then the event will collapse