import { env } from "@/env";
import { setCookie } from "hono/cookie";
import { Hono } from "hono";
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
      return c.json({ success: false, error: "Invalid credentials" }, 401);
    }
    // Generate JWT token payload
    const payload = {
      email,
      iss: env.AUTH_ISSUER,
      exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour expiration
    }; // 1 hour expiration
    // Sign the token
    const token = await sign(payload, env.AUTH_SECRET);
    // return cookie with auth token
    setCookie(c, "token", token);
    // return token in response for testing
    return c.json({
      success: true,
      token,
    });
    // TODO: add user to db
  },
);

export default login;
