import { Hono } from "hono";
import { logger } from "hono/logger";
import auth from "./routes/auth";
import login from "./routes/login";
import photos from "./routes/photos";
import photographers from "./routes/photographers";
import { bearerAuth } from "hono/bearer-auth";
import { env } from "@/env";
import { verify } from "hono/jwt";

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
        try {
          const payload = await verify(token, env.AUTH_SECRET, {
            alg: "HS256",
            iss: env.AUTH_ISSUER,
          });
          // TODO: payload includes email which can be used for additional authentication logic
          // console.log(payload);
          return true;
        } catch (error) {
          if (error instanceof Error) {
            // log error message for debugging
            console.error("Token verification failed:", error.name);
            // throw new Error(`Unauthorized: ${error.message}`);
          }
          return true;
        }
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
