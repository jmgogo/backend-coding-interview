import { describe, test, expect } from "bun:test";

describe("Users API", () => {
  // TODO setup and teardown for tests, e.g. start server, clear database, etc.
  describe("GET /users", () => {
    test.todo("should return a list of all users / max amount", () => {});
    test.todo("should return an empty array when no users exist", () => {});
    test.todo("should return 200 status code", () => {});
  });

  describe("GET /users/:id", () => {
    test.todo("should return a single user by id", () => {});
    test.todo("should return 400 when id is not a valid number", () => {});
    test.todo("should return 404 when user does not exist", () => {});
  });

  describe("POST /users", () => {
    test.todo("should create a new user with valid data", () => {});
    test.todo("should return 201 status code on success", () => {});
    test.todo("should return a unique id", () => {});
    test.todo("should return 400 body fails schema validation", () => {});
    test.todo("should return 409 when email already exists", () => {});
    test.todo(
      "should return 415 when Content-Type is not application/json",
      () => {},
    );
  });

  describe("PUT /users/:id", () => {
    test.todo("should update an existing user with valid data", () => {});
    test.todo("should return 404 when user does not exist", () => {});
    test.todo("should return 400 when body fails schema validation", () => {});
    test.todo("should not overwrite the user id", () => {});
    test.todo(
      "should return 415 when content-type is not application/json",
      () => {},
    );
  });

  describe("DELETE /users/:id", () => {
    test.todo("should delete an existing user", () => {});
    test.todo("should return 204 on success", () => {});
    test.todo("should return 404 when user does not exist", () => {});
    test.todo("should not be retrievable after deletion", () => {});
  });
});
