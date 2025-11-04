import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const USE_PROXY = false; // Toggle: true => frontend proxies /api/v1/users, false => call Rails directly
const FRONTEND_BASE = "/"; // Uses Cypress baseUrl
const ENDPOINT_PATH = "/api/v1/users";
const BACKEND_BASE = "http://localhost:3000";

function usersUrl() {
  return USE_PROXY ? ENDPOINT_PATH : `${BACKEND_BASE}${ENDPOINT_PATH}`;
}

Given("the SDP API Frontend app is running", () => {
  cy.visit(FRONTEND_BASE);
});

When("the user opens the home page", () => {
  cy.visit(FRONTEND_BASE);
});

Then('the {string} title is visible', (text) => {
  cy.contains(text).should("be.visible");
});

Then('the {string} button is visible', (text) => {
  cy.contains("button, a", text).should("be.visible");
});

When('the user clicks the {string} button', (text) => {
  cy.contains("button, a", text).click();
});

Then('the {string} card is visible', (text) => {
  cy.contains(text).should("be.visible");
});

Then('the {string} endpoint path is visible', (endpoint) => {
  cy.contains(endpoint).should("be.visible");
});

Given("the playground page is open", () => {
  cy.visit(FRONTEND_BASE);
  cy.contains("button, a", "Open Playground").click();
  cy.contains("API Playground").should("be.visible");
});

Then(
  'the frontend sends a GET {string} request to the backend and it succeeds',
  (endpoint) => {
    // Spy on real request (pass-through), then click and wait.
    const url = usersUrl();
    expect(endpoint).to.eq(ENDPOINT_PATH);
    cy.intercept("GET", url).as("getUsers");
    cy.contains("button, a", "Send Request").click();
    cy.wait("@getUsers").its("response.statusCode").should("eq", 200);
  }
);

Then("a success indicator is visible", () => {
  cy.contains(/200|success|ok/i).should("exist");
});

Given('the backend will return 500 for {string}', (endpoint) => {
  const url = usersUrl();
  expect(endpoint).to.eq(ENDPOINT_PATH);
  cy.intercept("GET", url, {
    statusCode: 500,
    body: { error: "Internal Server Error" },
  }).as("getUsers");
});

// Use the generic button click step above for all buttons

Then("an error indicator is visible", () => {
  cy.wait("@getUsers");
  cy.contains(/error|failed|cannot/i).should("exist");
});
