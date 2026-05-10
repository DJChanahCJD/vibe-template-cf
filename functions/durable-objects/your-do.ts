import { DurableObject } from "cloudflare:workers";

/**
 * 提供最小 Durable Object WebSocket 示例，并支持向当前实例广播消息。
 */
export class YourDurableObject extends DurableObject {
  /**
   * 处理 WebSocket upgrade 或内部广播请求。
   */
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/broadcast") {
      const message = await request.text();
      this.broadcast(message);
      return new Response("ok");
    }

    const pair = new WebSocketPair();
    const [client, server] = Object.values(pair);

    this.ctx.acceptWebSocket(server);

    return new Response(null, { status: 101, webSocket: client });
  }

  /**
   * 向当前 Durable Object 实例内的所有活动 WebSocket 发送消息。
   */
  private broadcast(message: string): void {
    const sockets = this.ctx.getWebSockets();

    for (const ws of sockets) {
      try {
        ws.send(message);
      } catch {
        // 发送失败说明连接状态已不可用，Hibernation API 会负责生命周期。
      }
    }
  }

  /**
   * 接收客户端消息；模板默认不定义业务协议。
   */
  async webSocketMessage(_ws: WebSocket, _message: string): Promise<void> {
    return;
  }

  /**
   * WebSocket 关闭时无需手动清理，连接由 Hibernation API 管理。
   */
  async webSocketClose(_ws: WebSocket): Promise<void> {
    return;
  }

  /**
   * WebSocket 出错时保持静默，避免单个连接影响实例。
   */
  async webSocketError(_ws: WebSocket, _error: unknown): Promise<void> {
    return;
  }
}
