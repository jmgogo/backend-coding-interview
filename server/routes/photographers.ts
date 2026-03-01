import { Hono } from "hono";

export const photographers = new Hono()
  .get("/:id", (c) => {
    const id = c.req.param("id");
    return c.json({ id, name: "John Doe" });
  })
  .post("/", async (c) => {
    const body = await c.req.json();
    // TODO: add photographer to db
    return c.json({ created: true, ...body });
  });

export type AppType = typeof photographers;
export default photographers;
