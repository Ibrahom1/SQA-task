const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    },
    viewportHeight: 1300,
    viewportWidth: 1368,
  },
});