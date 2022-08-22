import express, { NextFunction, Request, Response } from 'express';
import { userRoutes } from './routes/account.routes';
import { errorHandler } from './middlewares/errorHandler';
import { AppError } from './errors/AppError';

export const app = express();

app.use(express.json());

app.use('/account', userRoutes);

app.use(errorHandler);