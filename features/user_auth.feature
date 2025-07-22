# backend-api/features/user_auth.feature
Feature: User Authentication API
  As a registered user
  I want to log in
  So that I can access secure resources

  Scenario: Successful user login with valid credentials
    Given a user with email "test@example.com" and password "myPassword" exists in the database
    When I send a POST request to "/api/auth/login" with body:
      | email            | password   |
      | test@example.com | myPassword |
    Then the response status code should be 200
    And the response body should contain a "token" field (JWT)
    And the response body should contain a "message" field with value "Login successful"

  Scenario: Failed login with invalid password
    Given a user with email "test@example.com" and password "correctPassword" exists in the database
    When I send a POST request to "/api/auth/login" with body:
      | email            | password      |
      | test@example.com | wrongPassword |
    Then the response status code should be 401
    And the response body should contain a "message" field with value "Invalid credentials"