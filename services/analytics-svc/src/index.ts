import cors from 'cors';
import express from 'express';
import analyticsRouter from './routes/analytics';

const app = express();
const port = Number(process.env.PORT ?? 4001);

app.use(cors());
app.use(express.json());

// Liveness/readiness probe target — must not touch Supabase, so the pod
// can report healthy even if it hasn't received real credentials yet.
app.get('/healthz', (_req, res) => {
  res.status(200).json({ status: 'ok', service: 'analytics-svc' });
});

app.use('/', analyticsRouter);

app.use((_req, res) => {
  res.status(404).json({ error: 'not found' });
});

app.listen(port, () => {
  console.log(`analytics-svc listening on :${port}`);
});
