import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';

import 'reflect-metadata';
import 'express-async-errors';

import { AppError } from '@shared/errors/AppError';

import { rootRouter } from './routes';

import '@shared/database/typeorm';
import '@shared/container';

const app = express();

app.use(express.json());
app.use(cors());
app.use(rootRouter);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log(`🔥 - SERVER STARTED ON PORT 3333`);
});
