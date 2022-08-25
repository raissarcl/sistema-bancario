import express, { NextFunction, Request, Response } from 'express';
import { userRoutes } from './routes/account.routes';
import { errorHandler } from './middlewares/errorHandler';

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

export const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/account', userRoutes);

app.use(errorHandler);