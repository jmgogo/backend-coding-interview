import { describe, test, expect } from "bun:test";

describe("Photos API", () => {
  describe("GET /photos", () => {
    test.todo("should return a list of all photos", () => {});
    test.todo("should return an empty array when no photos exist", () => {});
    test.todo("should return 200 status code", () => {});
  });

  describe("GET /photos/:id", () => {
    test.todo("should return a single photo by id", () => {});
    test.todo("should return 404 when photo does not exist", () => {});
    test.todo("should return 400 when id is not a valid number", () => {});
  });

  describe("POST /photos", () => {
    test.todo("should create a new photo with valid data", () => {});
    test.todo("should return 201 status code on success", () => {});
    test.todo("should auto-assign a unique id", () => {});
    test.todo("should return 400 when body fails schema validation", () => {});
    test.todo(
      "should return 415 when Content-Type is not application/json",
      () => {},
    );
  });

  describe("PUT /photos/:id", () => {
    test.todo("should update an existing photo with valid data", () => {});
    test.todo("should return 404 when photo does not exist", () => {});
    test.todo("should return 400 when body fails schema validation", () => {});
    test.todo("should not overwrite the photo id", () => {});
    test.todo(
      "should return 415 when Content-Type is not application/json",
      () => {},
    );
  });

  describe("DELETE /photos/:id", () => {
    test.todo("should delete an existing photo", () => {});
    test.todo("should return 204 on success", () => {});
    test.todo("should return 404 when photo does not exist", () => {});
    test.todo("should not be retrievable after deletion", () => {});
  });
});
