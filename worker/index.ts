// Making changes to this file is **STRICTLY** forbidden. Please add your routes in `userRoutes.ts` file.

import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { userRoutes } from './userRoutes';
import { Env } from './core-utils';

export interface ClientErrorReport {
  message: string;
  url: string;
  timestamp: string;
  stack?: string;
  componentStack?: string;
  errorBoundary?: boolean;
  errorBoundaryProps?: Record<string, unknown>;
  source?: string;
  lineno?: number;
  colno?: number;
  error?: unknown;
}

const app = new Hono<{ Bindings: Env }>();

app.use('*', logger());

// CORS configuration for API routes
const corsConfig = {
  origin: ['https://inboundwizard.com', 'https://www.inboundwizard.com', 'https://media.inboundwizard.com', 'http://localhost:5173'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
  exposeHeaders: ['Content-Length', 'X-Request-Id'],
  credentials: true,
  maxAge: 600
};

app.use('/api/*', cors(corsConfig));

// Add CORS for media proxy routes
app.use('/media/*', cors({
  origin: ['https://inboundwizard.com', 'https://www.inboundwizard.com', 'https://media.inboundwizard.com'],
  allowMethods: ['GET', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Accept', 'Range'],
  exposeHeaders: ['Content-Length', 'Content-Type', 'Accept-Ranges'],
  maxAge: 86400 // 24 hours
}));

userRoutes(app);
app.get('/api/health', (c) => c.json({ success: true, data: { status: 'healthy', timestamp: new Date().toISOString() }}));

app.post('/api/client-errors', async (c) => {
  try {
    const e = await c.req.json<ClientErrorReport>();
    console.error('[CLIENT ERROR]', JSON.stringify({ timestamp: e.timestamp || new Date().toISOString(), message: e.message, url: e.url, stack: e.stack, componentStack: e.componentStack, errorBoundary: e.errorBoundary }, null, 2));
    return c.json({ success: true });
  } catch (error) {
    console.error('[CLIENT ERROR HANDLER] Failed:', error);
    return c.json({ success: false, error: 'Failed to process' }, 500);
  }
});

app.notFound((c) => c.json({ success: false, error: 'Not Found' }, 404));
app.onError((err, c) => { console.error(`[ERROR] ${err}`); return c.json({ success: false, error: 'Internal Server Error' }, 500); });

console.log(`Server is running`)

export default { fetch: app.fetch } satisfies ExportedHandler<Env>;