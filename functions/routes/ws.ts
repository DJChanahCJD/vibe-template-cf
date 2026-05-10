import { Hono } from "hono";
import type { Env } from "../types/hono";
import { fail, ok } from "@utils/response";

export const wsRoutes = new Hono<{ Bindings: Env }>();

/**
 * 将房间 WebSocket 连接转发到按 roomCode 命名的 Durable Object。
 */
wsRoutes.get("/:roomCode", async (c) => {
  const upgrade = c.req.header("Upgrade");
  if (upgrade !== "websocket") {
    return fail(c, "Expected WebSocket upgrade", 426);
  }

  const roomCode = c.req.param("roomCode");
  const id = c.env.your_do.idFromName(roomCode);
  const stub = c.env.your_do.get(id);

  return stub.fetch(c.req.raw);
});

/**
 * 触发指定房间的广播，用于本地验证 Durable Object WebSocket 示例。
 */
wsRoutes.post("/:roomCode/broadcast", async (c) => {
  const roomCode = c.req.param("roomCode");
  const id = c.env.your_do.idFromName(roomCode);
  const stub = c.env.your_do.get(id);
  const body = (await c.req.json().catch(() => ({}))) as {
    reason?: string;
    version?: number;
  };

  await stub.fetch("https://room-sync.local/broadcast", {
    method: "POST",
    body: JSON.stringify({
      type: "room.updated",
      roomCode,
      version: body.version ?? Date.now(),
      reason: body.reason ?? "manual",
    }),
  });

  return ok(c, { roomCode }, "Broadcast sent");
});
