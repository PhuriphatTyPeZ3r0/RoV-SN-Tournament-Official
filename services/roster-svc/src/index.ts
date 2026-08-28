import cors from 'cors';
import express from 'express';
import teamsRouter from './routes/teams';

const app = express();
const port = Number(process.env.PORT ?? 4002);

app.use(cors());
app.use(express.json());

app.get('/healthz', (_req, res) => {
  res.status(200).json({ status: 'ok', service: 'roster-svc' });
});

app.use('/', teamsRouter);

app.use((_req, res) => {
  res.status(404).json({ error: 'not found' });
});

app.listen(port, () => {
  console.log(`roster-svc listening on :${port}`);
});
