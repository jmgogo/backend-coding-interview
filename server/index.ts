import { Hono } from "hono";

const app = new Hono();

// Create user with POST
app.post("/users", async (c) => {
  const body = await c.req.json();
  return c.json({ created: true, ...body });
});

// Get user with GET
app.get("/users/:id", (c) => {
  const id = c.req.param("id");
  return c.json({ id, name: "John Doe" });
});

// Per-HTTP method handlers
app.get("/api/photos", (c) => {
  return c.text("List photos");
});

app.post("/api/photos", async (c) => {
  const body = await c.req.json();
  return c.json({ created: true, ...body });
});

// Wildcard route for all routes that aren't otherwise matched
app.all("*", (c) => {
  return c.json({ message: "Not found" }, 404);
});

export default app;
