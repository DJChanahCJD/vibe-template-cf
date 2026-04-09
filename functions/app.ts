import { corsMiddleware } from './middleware/cors';
import { authRoutes } from './routes/auth';
import { proxyRoutes } from './routes/proxy';

import { Hono } from 'hono';
import type { Env } from './types/hono';

export const app = new Hono<{
  Bindings: Env;
}>().basePath('');

// Global Middleware
app.use('*', corsMiddleware);

// Routes
app.route('/auth', authRoutes);

app.route('/proxy', proxyRoutes);

// Export AppType for RPC
export type AppType = typeof app;
