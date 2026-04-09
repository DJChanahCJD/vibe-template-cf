# Vibe Template CF

<p align="center">
  <img width="100" alt="Vibe Template CF icon" src="frontend/app/icon.svg">
</p>
<p align="center"><strong>Vibe Template CF</strong></p>

<p align="center">
  基于 Next.js 16、Tailwind CSS v4、Hono 和 Cloudflare Pages 的现代化全栈开发模板。
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Hono-4.x-000000?logo=hono&logoColor=white" />
  <img src="https://img.shields.io/badge/State-Zustand-orange" />
</p>


## ✨ 核心功能
- **全栈架构**: Monorepo (Frontend + Functions + Shared)
- **前端框架**: [Next.js 16](https://nextjs.org/) (App Router) + [React 19](https://react.dev/)
- **后端运行时**: [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/functions/) + [Hono](https://hono.dev/)
- **样式方案**: [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **状态管理**: [Zustand](https://zustand-demo.pmnd.rs/)
- **类型安全**: TypeScript + Shared Types

## 🚀 快速开始

### 前置要求

- Node.js 18+
- Cloudflare 账号（免费）

### 本地开发

1. **安装依赖**
   ```bash
   # 在根目录运行，自动安装所有 Workspaces 依赖
   npm install
   ```

2. **启动项目**
   ```bash
   npm run dev
   ```
> 第一次启动需要构建前端 `npm run build`，后续启动直接 `npm run dev` 即可。

3. **访问网站**
   - 前端：`http://localhost:3000`
   - 后端：`http://localhost:8080` (由 Wrangler 代理)

> [!TIP]
> 开发环境下密码为`123456`（在访问 `/admin` 页面时需要）
> 修改 functions 代码后，可运行 `npm run ci-test` 快速测试功能是否正常。

---

## 📦 Cloudflare 部署

### 1. 创建 Pages 项目

Fork 本项目，然后在 Cloudflare Dashboard 创建 Pages 项目：

- **构建命令**: `npm run build`
- **构建输出目录**: `frontend/out`

### 2. 配置环境变量

在 Pages 项目的设置中添加以下环境变量：

```env
PASSWORD=your_password          # 密码
```

### 3. 重试部署

回到部署页面重试部署，让环境变量生效。

## 📂 项目结构

- `frontend/`: Next.js 前端应用
  - `app/`: 页面与布局
  - `components/`: UI 组件与业务组件
  - `lib/`: 工具函数与 API 客户端
  - `stores/`: 状态管理
- `functions/`: Cloudflare Pages Functions 后端 (Hono)
  - `routes/`: API 路由定义
  - `middleware/`: 中间件 (Auth, CORS)
  - `utils/`: 后端工具函数
- `shared/`: 前后端共享代码 (Types, Utils)

## 🔍 参考资料

- [Cloudflare API](https://developers.cloudflare.com/api)

## 🤝 Contributing

欢迎提交 **Issue** 反馈问题或建议新功能，也欢迎 **Pull Request** 一起完善项目！
觉得有用的话，点个 ⭐️ 支持一下吧！