import {
  describe,
  test,
  expect,
  beforeAll,
  beforeEach,
  afterEach,
  afterAll,
} from "bun:test";

describe("photographers API", () => {
  // TODO setup and teardown for tests, e.g. start server, clear database, etc.
  describe("GET /photographers", () => {
    test.todo(
      "should return a list of all photographers / max amount",
      () => {},
    );
    test.todo(
      "should return an empty array when no photographers exist",
      () => {},
    );
    test.todo("should return 200 status code", () => {});
  });

  describe("GET /photographers/:id", () => {
    test.todo("should return a single photographer by id", () => {});
    test.todo("should return 400 when id is not a valid number", () => {});
    test.todo("should return 404 when photographer does not exist", () => {});
  });

  describe("POST /photographers", () => {
    test.todo("should create a new photographer with valid data", () => {});
    test.todo("should return 201 status code on success", () => {});
    test.todo("should return a unique id", () => {});
    test.todo("should return 400 body fails schema validation", () => {});
    test.todo("should return 409 when email already exists", () => {});
    test.todo(
      "should return 415 when Content-Type is not application/json",
      () => {},
    );
  });

  describe("PUT /photographers/:id", () => {
    test.todo(
      "should update an existing photographer with valid data",
      () => {},
    );
    test.todo("should return 404 when photographer does not exist", () => {});
    test.todo("should return 400 when body fails schema validation", () => {});
    test.todo("should not overwrite the photographer id", () => {});
    test.todo(
      "should return 415 when content-type is not application/json",
      () => {},
    );
  });

  describe("DELETE /photographers/:id", () => {
    test.todo("should delete an existing photographer", () => {});
    test.todo("should return 204 on success", () => {});
    test.todo("should return 404 when photographer does not exist", () => {});
    test.todo("should not be retrievable after deletion", () => {});
  });
});
