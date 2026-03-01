import { Hono } from "hono";
import { logger } from "hono/logger";
import auth from "./routes/auth";
import login from "./routes/login";
import photos from "./routes/photos";
import photographers from "./routes/photographers";
import { bearerAuth } from "hono/bearer-auth";
import { getCookie } from "hono/cookie";

export const privilegedMethods = ["POST", "PUT", "DELETE"];

const app = new Hono()
  // Set up logger middleware for all routes
  .use(logger())
  // Set public route for login
  .route("/login", login)
  // Add auth route for privileged routes
  .route("/auth", auth)
  // Add auth check for privileged methods
  .on(
    privilegedMethods,
    "/*",
    bearerAuth({
      verifyToken: async (token, c) => {
        console.log("Verifying token:", token);
        return token === getCookie(c, "token");
      },
    }),
  )
  // Add routes with privileged methods
  .route("/photos", photos)
  .route("/photographers", photographers)
  // Add wildcard route for all routes that aren't otherwise matched
  .all("*", (c) => {
    return c.json({ message: "Not found" }, 404);
  });

export default app;
export type AppType = typeof app;
