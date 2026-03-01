import { bearerAuth } from "hono/bearer-auth";
import { getCookie } from "hono/cookie";
import { Hono } from "hono";

const auth = new Hono()
  .use(
    "/*",
    bearerAuth({
      verifyToken: async (token, c) => {
        return token === getCookie(c, "token");
      },
    }),
  )
  .get("/test", (c) => {
    return c.json({ message: "success" });
  });

export default auth;
