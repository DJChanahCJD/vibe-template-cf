# Vibe Pages Vite

<p align="center">
  <img width="100" alt="Vibe Pages Vite icon" src="public/icon.svg">
</p>
<p align="center"><strong>Vibe Pages Vite</strong></p>

<p align="center">
  基于 Vite、React、Tailwind CSS v4、shadcn/ui 和 Cloudflare Pages 的纯前端应用模板。
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Vite-7.x-646CFF?logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Router-React_Router-CA4245" />
  <img src="https://img.shields.io/badge/State-Zustand-orange" />
</p>

## 核心功能

- **纯前端架构**: Vite + React SPA，根目录直接开发。
- **样式方案**: Tailwind CSS v4 + shadcn/ui 完整组件库。
- **路由方案**: React Router + Cloudflare Pages SPA fallback。
- **开发基座**: 暗色主题、toast、Zustand 持久化示例、常用工具函数。
- **部署目标**: Cloudflare Pages 静态站点，构建产物输出到 `dist`。

## 快速开始

### 前置要求

- Node.js 20.19+ 或 22.12+
- Cloudflare 账号（部署时需要）

### 1. 获取项目

```bash
git clone https://github.com/DJChanahCJD/vibe-template-cf.git <your-project-name>
cd <your-project-name>
git switch pages-vite
```

### 2. 重置仓库（推荐）

```bash
git remote remove origin
rm -r -fo .git
git init
```

### 3. 安装依赖

```bash
npm install
```

### 4. 本地开发

```bash
npm run dev
```

访问 Vite 提示的本地地址，通常是 `http://localhost:5173`。

## Cloudflare Pages 部署

在 Cloudflare Dashboard 创建 Pages 项目并连接仓库：

- **构建命令**: `npm run build`
- **构建输出目录**: `dist`

本模板已经提供 `public/_redirects`，React Router 的前端路由刷新后会回退到 `index.html`。

本地预览 Cloudflare Pages 静态产物：

```bash
npm run build
npm run pages:dev
```

## 项目结构

```text
vibe-pages-vite/
├── src/
│   ├── App.tsx                    # 应用路由与默认首页
│   ├── globals.css                # Tailwind v4 与主题变量
│   └── main.tsx                   # React 入口
├── components/
│   ├── ui/                        # shadcn/ui 组件库
│   ├── theme-provider.tsx
│   └── ThemeToggle.tsx
├── hooks/                         # React 自定义 Hooks
├── lib/
│   └── utils/                     # 通用前端工具
├── stores/                        # Zustand 状态管理
├── public/
│   ├── _redirects                 # Cloudflare Pages SPA fallback
│   ├── icon.svg
│   └── manifest.webmanifest
├── components.json                # shadcn/ui 配置
├── vite.config.ts                 # Vite 配置
├── wrangler.jsonc                 # Cloudflare Pages 静态预览配置
└── package.json
```

## 开发检查

```bash
npm run typecheck
npm run lint
npm run build
```

或一次运行：

```bash
npm run ci:static
```

项目已配置 Husky pre-commit hook，会运行类型检查与 lint-staged。

## 分支说明

`main` 分支保留全栈 Next.js + Hono + Cloudflare Pages Functions 模板。

`pages-vite` 分支专注纯前端 Cloudflare Pages 应用。
