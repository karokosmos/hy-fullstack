/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
const app = express();

app.use(express.json());

import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!height || !weight) {
    res.status(400).json({ error: 'malformatted parameters' });
  }

  const bmi = calculateBmi(height, weight);

  const result = {
    weight,
    height,
    bmi
  };

  res.json(result);
});

interface Body {
  daily_exercises: number[],
  target: number
}

app.post('/exercises', (req, res) => {
  console.log(req.body);
  const body = req.body as Body;
  const hours = body.daily_exercises;
  const target = body.target;

  if (!hours || !target) {
    res.status(400).json({ error: 'parameters missing' });
  } else if (!Array.isArray(hours) || hours.some(isNaN) || isNaN(target)) {
    res.status(400).json({ error: 'malformatted parameters' });
  }

  const result = calculateExercises(hours, target);
  res.json(result);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
