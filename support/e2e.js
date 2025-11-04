// Intentionally no import of '@badeball/cypress-cucumber-preprocessor/steps'.
// Modern Badeball config registers the preprocessor via setupNodeEvents.
// Import Given/When/Then in each step file instead.

// Optional slow motion for clearer videos
// Enable by running: `cypress run --env SLOWMO=500`
const SLOWMO = Number(Cypress.env('SLOWMO')) || 0;
if (SLOWMO > 0) {
  const delay = (val) => Cypress.Promise.delay(SLOWMO).then(() => val);

  // Commands (use overwrite)
  const cmdNames = ['visit', 'click', 'type', 'clear', 'trigger', 'request'];
  for (const name of cmdNames) {
    Cypress.Commands.overwrite(name, (originalFn, ...args) => {
      const result = originalFn(...args);
      return delay(result);
    });
  }

  // Note: Do NOT slow down queries like `contains/get/find`.
  // Queries are synchronous and must use overwriteQuery with care;
  // delaying them breaks Cypress internals in v15.
}
