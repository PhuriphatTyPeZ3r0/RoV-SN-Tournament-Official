import cors from 'cors';
import express from 'express';
import matchesRouter from './routes/matches';
import themesRouter from './routes/themes';

const app = express();
const port = Number(process.env.PORT ?? 4003);

app.use(cors());
app.use(express.json());

app.get('/healthz', (_req, res) => {
  res.status(200).json({ status: 'ok', service: 'tournament-svc' });
});

app.use('/', matchesRouter);
app.use('/', themesRouter);

app.use((_req, res) => {
  res.status(404).json({ error: 'not found' });
});

app.listen(port, () => {
  console.log(`tournament-svc listening on :${port}`);
});
