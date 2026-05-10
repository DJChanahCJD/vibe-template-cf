import { DurableObject } from "cloudflare:workers";

type RoomMessage = {
  type: "room.updated";
  roomCode: string;
  version: number;
  reason: string;
};

/**
 * 维护单个房间内的 WebSocket 连接，并向同房间客户端广播消息。
 */
export class RoomSync extends DurableObject {
  /**
   * 处理 WebSocket upgrade 或内部广播请求。
   */
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/broadcast") {
      const msg = (await request.json()) as RoomMessage;
      await this.broadcast(msg);
      return new Response("ok");
    }

    const pair = new WebSocketPair();
    const [client, server] = Object.values(pair);

    this.ctx.acceptWebSocket(server);

    return new Response(null, { status: 101, webSocket: client });
  }

  /**
   * 向当前 Durable Object 内的所有活动 WebSocket 发送消息。
   */
  private async broadcast(msg: RoomMessage): Promise<void> {
    const data = JSON.stringify(msg);
    const sockets = this.ctx.getWebSockets();

    for (const ws of sockets) {
      try {
        ws.send(data);
      } catch {
        // 发送失败说明连接状态已不可用，Hibernation API 会负责生命周期。
      }
    }
  }

  /**
   * 响应客户端 ping，用于验证 WebSocket 连接可用。
   */
  async webSocketMessage(ws: WebSocket, message: string): Promise<void> {
    try {
      const msg = JSON.parse(message);
      if (msg.type === "ping") {
        ws.send(JSON.stringify({ type: "pong" }));
      }
    } catch {
      // 忽略无效消息。
    }
  }

  /**
   * WebSocket 关闭时无需手动清理，连接由 Hibernation API 管理。
   */
  async webSocketClose(_ws: WebSocket): Promise<void> {
    return;
  }

  /**
   * WebSocket 出错时保持静默，避免单个连接影响房间。
   */
  async webSocketError(_ws: WebSocket, _error: unknown): Promise<void> {
    return;
  }
}
