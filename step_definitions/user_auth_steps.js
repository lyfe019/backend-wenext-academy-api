// backend-api/step_definitions/user_auth_steps.js
const { Given, When, Then, BeforeAll } = require('@cucumber/cucumber');
const axios = require('axios');
const { expect } = require('expect'); // Using expect for assertions

let response; // To store the API response
let backendServer; // To manage the backend server instance for testing

// --- Helper for starting/stopping a simple backend server for tests ---
// In a real scenario, you'd mock the database or start a dedicated test server
BeforeAll(function() {
  // This is a simplified way to start the server for testing purposes.
  // For more robust integration tests, you'd use a library like 'supertest'
  // or run your app in a dedicated test mode.
  // For now, let's assume the API will be running at localhost:3000
  // You might need to adjust this if your app.js is not directly runnable for tests.
  // Alternatively, you could spin up a separate instance of your app for tests here.
  // For simplicity in this example, we'll just define the base URL.
  this.backendBaseUrl = 'http://localhost:3000'; // Make sure your backend-api is running!
});

Given('a user with email {string} and password {string} exists in the database', function (email, password) {
  // In a real application, this would involve inserting a user into a test database.
  // For now, we'll just simulate a successful pre-condition.
  this.testUser = { email, password };
  console.log(`(Mock) User ${email} exists.`);
});

When('I send a POST request to {string} with body:', async function (path, table) {
  const requestBody = table.rowsHash();
  try {
    // Ensure your backend-api server is running before running these tests
    response = await axios.post(`${this.backendBaseUrl}${path}`, requestBody);
  } catch (error) {
    response = error.response; // Capture error response for negative scenarios
  }
});

Then('the response status code should be {int}', function (statusCode) {
  expect(response.status).toBe(statusCode);
});

Then('the response body should contain a {string} field {string}', function (fieldName, expectedValue) {
  if (fieldName === "message") {
    expect(response.data[fieldName]).toBe(expectedValue);
  } else {
     // For 'token' field, just check if it exists and is a string
    expect(response.data).toHaveProperty(fieldName);
    expect(typeof response.data[fieldName]).toBe('string');
    expect(response.data[fieldName].length).toBeGreaterThan(0);
  }
});

Then('the response body should contain a {string} field', function (fieldName) {
  expect(response.data).toHaveProperty(fieldName);
});