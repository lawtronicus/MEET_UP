Feature: Specify Number of Events

  Scenario: Default number of events displayed is 32
    Given I have navigated to the upcoming events page
    And I have not yet specified a number of events to view
    When I scroll through the events
    Then I will see a maximum of 32 events displayed per page

  Scenario: User specifies a number of events to display
    Given I have navigated to the upcoming events page
    When I specify a particular number X of events
    Then a maximum of X events will be displayed per page