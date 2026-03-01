import { Hono } from "hono";
import { logger } from "hono/logger";
import { env } from "@/env";
import { HTTPException } from "hono/http-exception";
import { sign } from "hono/jwt";
import { getCookie, setCookie } from "hono/cookie";
import { bearerAuth } from "hono/bearer-auth";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const privilegedMethods = ["POST", "PUT", "DELETE"];

const app = new Hono();

app.use(logger());

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// Login user with credentials and return JWT in cookie
app.post("/login", zValidator("json", loginSchema), async (c) => {
  const { email, password } = await c.req.json();
  // TEMP: test admin credentials
  if (email !== env.ADMIN_EMAIL || password !== env.ADMIN_PASS) {
    throw new HTTPException(401, { message: "Invalid credentials" });
  }
  // Generate JWT token payload
  const payload = { email, exp: Math.floor(Date.now() / 1000) + 60 * 60 }; // 1 hour expiration
  // Sign the token
  const token = await sign(payload, env.AUTH_SECRET);
  // return cookie with auth token
  setCookie(c, "token", token);
  // return payload and token in response for testing
  return c.json({
    payload,
    token,
  });
  // TODO: add user to db
});

app.use(
  "/auth/*",
  bearerAuth({
    verifyToken: async (token, c) => {
      return token === getCookie(c, "token");
    },
  }),
);

app.get("/auth/test", (c) => {
  return c.json({ message: "success" });
});

app.on(
  privilegedMethods,
  "/users/*",
  bearerAuth({
    verifyToken: async (token, c) => {
      return token === getCookie(c, "token");
    },
  }),
);

// Get user with GET
app.get("/users/:id", (c) => {
  const id = c.req.param("id");
  return c.json({ id, name: "John Doe" });
});

// Create user with POST
app.post("/users", async (c) => {
  const body = await c.req.json();
  // TODO: add user to db
  return c.json({ created: true, ...body });
});

app.on(
  privilegedMethods,
  "/photos/*",
  bearerAuth({
    verifyToken: async (token, c) => {
      return token === getCookie(c, "token");
    },
  }),
);

// Per-HTTP method handlers
app.get("/photos", (c) => {
  return c.text("List photos");
});

app.post("/photos", async (c) => {
  const body = await c.req.json();
  return c.json({ created: true, ...body });
});

// Wildcard route for all routes that aren't otherwise matched
app.all("*", (c) => {
  return c.json({ message: "Not found" }, 404);
});

export default app;
