import { env } from "@/env";
import { setCookie } from "hono/cookie";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { sign } from "hono/jwt";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const login = new Hono().post(
  "/",
  zValidator("json", loginSchema),
  async (c) => {
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
  },
);

export default login;
