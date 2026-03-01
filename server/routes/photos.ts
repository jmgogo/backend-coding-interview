import { Hono } from "hono";

export const photos = new Hono()
  .get("/", (c) => {
    return c.text("List photos");
  })
  .post("/", async (c) => {
    const body = await c.req.json();
    return c.json({ created: true, ...body });
  });

export type AppType = typeof photos;
export default photos;
