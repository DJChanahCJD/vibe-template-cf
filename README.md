# Vibe Template CF Worker

[纯前端版本](https://github.com/DJChanahCJD/vibe-template-cf/tree/pages-vite) | [Worker 版本](https://github.com/DJChanahCJD/vibe-template-cf/tree/worker)

<p align="center">
  <img width="100" alt="Vibe Template CF icon" src="frontend/app/icon.svg">
</p>
<p align="center"><strong>Vibe Template CF Worker</strong></p>

<p align="center">
  基于 Next.js 16、Tailwind CSS v4、Hono、Cloudflare Workers 和 Durable Objects 的全栈模板。
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Hono-4.x-000000?logo=hono&logoColor=white" />
  <img src="https://img.shields.io/badge/Workers-Durable_Objects-F38020?logo=cloudflare&logoColor=white" />
</p>

## 核心功能

- **部署目标**: Cloudflare Workers + Workers Static Assets
- **前端框架**: Next.js 16 静态导出 + React 19
- **后端运行时**: Hono on Cloudflare Workers
- **实时能力**: SQLite-backed Durable Object + WebSocket Hibernation
- **数据绑定**: D1 / KV / Durable Objects 示例
- **样式方案**: Tailwind CSS v4 + shadcn/ui
- **类型安全**: TypeScript + Shared Types

## 快速开始

### 前置要求

- Node.js 18+
- Cloudflare 账号（免费计划可用）

### 安装依赖

```bash
npm install
```

### 本地开发

第一次启动前先构建静态前端资源：

```bash
npm run build
npm run dev
```

本地地址：

- Next.js 开发服务：`http://localhost:3000`
- Workers 开发服务：`http://localhost:8788`
- API 健康检查：`http://localhost:8788/api/db/health`

> 开发环境绑定来自 `wrangler.jsonc`：`your_kv`、`your_db`、`your_do` 和 `PASSWORD=123456`。

## API 路由

Worker 入口只把 `/api/*` 请求交给 Hono，其余请求回退到静态资源。

当前内置路由：

- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/db/health`
- `GET /api/proxy`
- `GET /api/ws/:id`
- `POST /api/ws/:id/broadcast`

前端 Hono client 的 base URL 已统一为 `/api`。

## WebSocket 示例

`YourDurableObject` 是一个最小 Durable Object WebSocket 示例：

- 同一个 `id` 会映射到同一个 Durable Object
- 客户端可以连接到 `GET /api/ws/:id`
- 调用 `POST /api/ws/:id/broadcast` 会把请求 body 原样广播给该实例的所有连接
- 使用 WebSocket Hibernation API，不依赖常驻内存循环
- Cloudflare 绑定名统一使用 `your_do`

浏览器控制台测试：

```js
const ws = new WebSocket("ws://localhost:8788/api/ws/demo");
ws.onmessage = (event) => console.log(event.data);
```

广播测试：

```bash
curl -X POST http://localhost:8788/api/ws/demo/broadcast ^
  -H "Content-Type: application/json" ^
  -d "{\"message\":\"hello\"}"
```

## Cloudflare 部署

### 1. 构建

```bash
npm run build
```

### 2. 配置 Cloudflare 绑定

本模板使用占位命名：`your_kv`、`your_db`、`your_do`。创建资源后按需替换为你的项目命名。

创建 D1 后，在 `wrangler.jsonc` 增加真实 D1 绑定：

```jsonc
"d1_databases": [
  {
    "binding": "your_db",
    "database_name": "your_db",
    "database_id": "your-d1-database-id"
  }
]
```

然后通过 `GET /api/db/health` 检查绑定。

Durable Object 默认已配置为：

```jsonc
"durable_objects": {
  "bindings": [
    {
      "name": "your_do",
      "class_name": "YourDurableObject"
    }
  ]
}
```

### 3. 配置环境变量

```bash
npx wrangler secret put PASSWORD
```

### 4. 部署 Worker

```bash
npx wrangler deploy
```

## 免费计划注意事项

- Workers Free plan 可用于该模板的基础开发和部署。
- Durable Objects 在免费计划下使用 SQLite-backed classes，因此 `wrangler.jsonc` 使用 `new_sqlite_classes`。
- WebSocket 使用 Durable Object Hibernation API，避免普通长驻连接模型带来的额外资源浪费。
- D1、KV、Workers、Durable Objects 都有免费额度限制，生产项目需要按实际流量评估。

## 项目结构

```text
vibe-template-cf/
├── src/
│   └── index.ts                       # Cloudflare Workers 入口
├── frontend/                          # Next.js 静态前端
├── functions/                         # Hono API 与 Durable Objects
│   ├── app.ts                         # API 路由挂载
│   ├── durable-objects/
│   │   └── your-do.ts                 # WebSocket Durable Object
│   ├── routes/
│   │   ├── auth.ts
│   │   ├── db.ts
│   │   ├── proxy.ts
│   │   └── ws.ts
│   └── types/
├── shared/                            # 前后端共享类型
├── wrangler.jsonc                     # Workers 配置
└── package.json
```

## 开发检查

```bash
npm run typecheck
npm run lint
npm run build
```
