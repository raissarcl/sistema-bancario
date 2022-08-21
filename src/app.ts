import express from 'express';
import { userRoutes } from './routes/account.routes';
import { errorHandler } from './middlewares/errorHandler';

export const app = express();

app.use(express.json());

app.use('/account', userRoutes);

app.use(errorHandler)