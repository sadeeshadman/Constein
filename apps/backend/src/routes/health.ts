import { Router } from 'express';
import { dbConnect } from '../lib/mongodb';

export const healthRouter = Router();

healthRouter.get('/live', (_req, res) => {
  return res.json({ ok: true, status: 'alive' });
});

healthRouter.get('/ready', async (_req, res) => {
  try {
    await dbConnect();
    return res.json({ ok: true, status: 'ready', db: 'connected' });
  } catch {
    return res.status(503).json({ ok: false, status: 'not-ready' });
  }
});

healthRouter.get('/db', async (_req, res) => {
  try {
    await dbConnect();
    return res.json({ ok: true, db: 'connected' });
  } catch (err: unknown) {
    console.error('Database health check failed', err);
    return res.status(503).json({ ok: false, error: 'Database unavailable' });
  }
});
