import { corsMiddleware } from "./middleware/cors";
import { authRoutes } from "./routes/auth";
import { dbRoutes } from "./routes/db";
import { proxyRoutes } from "./routes/proxy";
import { wsRoutes } from "./routes/ws";

import { Hono } from "hono";
import type { Env } from "./types/hono";

export const app = new Hono<{
  Bindings: Env;
}>().basePath("");

// Global Middleware
app.use("*", corsMiddleware);

// Routes
app.route("/api/auth", authRoutes);

app.route("/api/db", dbRoutes);

app.route("/api/proxy", proxyRoutes);

app.route("/api/ws", wsRoutes);

// Export AppType for RPC
export type AppType = typeof app;
