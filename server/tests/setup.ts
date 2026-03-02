//bun test --preload ./setup.ts
// Testing: https://hono.dev/docs/guides/testing
// Scaffolding: https://hono.dev/docs/guides/best-practices#building-a-larger-application
// Test Lifecycle: https://bun.com/docs/test/lifecycle#global-setup-and-teardown
// Test Client: https://hono.dev/docs/helpers/testing

import { env } from "@/env";
import app, { type AppType } from "../index";
import { afterAll, beforeAll } from "bun:test";
import { testClient } from "hono/testing";

// let testToken: string;
const client = testClient<AppType>(app);

let testToken: string;

await beforeAll(async () => {
  console.log("Global test setup", Bun.env.ADMIN_PASS);

  try {
    client.photographers.$url();
    // Obtain auth token for tests
    const res = await client.login.$post({
      json: {
        email: env.ADMIN_EMAIL,
        password: env.ADMIN_PASS,
      },
    });
    const data = await res.json();

    if (data.success !== true) {
      throw new Error(
        `Failed to obtain auth token, status code: ${res.status}`,
      );
    }

    testToken = data.token;
    console.log("Obtained token for tests:", testToken);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Setup failed:", error.message);
    }
    throw error; // throw to skip test suite
  }
});

afterAll(() => {
  console.log("Global test teardown");
  // Close database connections, stop servers, etc.
});

export { client, testToken };
