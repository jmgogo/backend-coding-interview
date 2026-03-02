import { bearerAuth } from "hono/bearer-auth";
import { verify } from "hono/jwt";
import { Hono } from "hono";
import { env } from "@/env";

const auth = new Hono()
  .use(
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
            // Set 401 status code for unauthorized access
            c.status(401);
          }
          return false;
        }
      },
    }),
  )
  .get("/test", (c) => {
    return c.json({ message: "success" });
  });

export default auth;
