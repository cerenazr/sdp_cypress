Feature: Validate SDP API Frontend with API interactions
  As a developer
  I want to validate the UI and API interactions
  So I can verify the happy and negative paths for Users endpoint

  Background:
    Given the SDP API Frontend app is running

  Scenario: Happy path - user sees Users endpoint and successful request
    When the user opens the home page
    Then the "SDP API Frontend" title is visible
    And the "Open Playground" button is visible
    When the user clicks the "Open Playground" button
    Then the "API Playground" title is visible
    And the "Users Endpoint" card is visible
    And the "/api/v1/users" endpoint path is visible
    Then the frontend sends a GET "/api/v1/users" request to the backend and it succeeds
    And a success indicator is visible

  Scenario: Negative path - backend returns 500 and UI shows error
    Given the playground page is open
    And the backend will return 500 for "/api/v1/users"
    When the user clicks the "Send Request" button
    Then an error indicator is visible