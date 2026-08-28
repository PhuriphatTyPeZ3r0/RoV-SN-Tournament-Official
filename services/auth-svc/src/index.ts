import cors from 'cors';
import express from 'express';
import registrationsRouter from './routes/registrations';
import sessionRouter from './routes/session';

const app = express();
const port = Number(process.env.PORT ?? 4004);

app.use(cors());
app.use(express.json());

app.get('/healthz', (_req, res) => {
  res.status(200).json({ status: 'ok', service: 'auth-svc' });
});

app.use('/', registrationsRouter);
app.use('/', sessionRouter);

app.use((_req, res) => {
  res.status(404).json({ error: 'not found' });
});

app.listen(port, () => {
  console.log(`auth-svc listening on :${port}`);
});
