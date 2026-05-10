import { Hono } from "hono";
import type { Env } from "../types/hono";
import { fail, ok } from "@utils/response";

export const wsRoutes = new Hono<{ Bindings: Env }>();

/**
 * 将 WebSocket 连接转发到按 id 命名的 Durable Object。
 */
wsRoutes.get("/:id", async (c) => {
  const upgrade = c.req.header("Upgrade");
  if (upgrade !== "websocket") {
    return fail(c, "Expected WebSocket upgrade", 426);
  }

  const name = c.req.param("id");
  const durableObjectId = c.env.your_do.idFromName(name);
  const stub = c.env.your_do.get(durableObjectId);

  return stub.fetch(c.req.raw);
});

/**
 * 触发指定 Durable Object 实例的广播，用于本地验证 WebSocket 示例。
 */
wsRoutes.post("/:id/broadcast", async (c) => {
  const name = c.req.param("id");
  const durableObjectId = c.env.your_do.idFromName(name);
  const stub = c.env.your_do.get(durableObjectId);
  const body = await c.req.text();

  await stub.fetch("https://your-do.local/broadcast", {
    method: "POST",
    body,
  });

  return ok(c, { id: name }, "Broadcast sent");
});
