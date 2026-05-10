import { app } from "../functions/app";

export { RoomSync } from "../functions/durable-objects/room-sync";

/**
 * Cloudflare Workers 入口：API 交给 Hono，其余请求回退到静态资源。
 */
export default {
  async fetch(request: Request, env: any, ctx: ExecutionContext) {
    try {
      const url = new URL(request.url);

      if (url.pathname.startsWith("/api/")) {
        const response = await app.fetch(request, env, ctx);
        if (!response) {
          return new Response("app.fetch returned null/undefined", {
            status: 500,
          });
        }
        return response;
      }

      if (env.ASSETS) {
        return env.ASSETS.fetch(request);
      }

      return new Response("Frontend not available. Run: npm run build", {
        status: 503,
      });
    } catch (error) {
      const e = error as Error;
      console.error("Worker error:", e.message, e.stack);
      return new Response(`Worker Error: ${e.message}\n${e.stack}`, {
        status: 500,
      });
    }
  },
};
