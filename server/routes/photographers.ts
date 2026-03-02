import { Hono } from "hono";

const photographers = new Hono()
  .get("/", (c) => {
    return c.json([
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Smith" },
    ]);
  })
  .get("/:id", (c) => {
    const id = c.req.param("id");
    return c.json({ id, name: "John Doe" });
  })
  .post("/", async (c) => {
    const body = await c.req.json();
    // TODO: add photographer to db
    return c.json({ created: true, ...body }, 201);
  });

export type AppType = typeof photographers;
export default photographers;
