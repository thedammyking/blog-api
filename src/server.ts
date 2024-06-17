// eslint-disable-next-line simple-import-sort/imports
import './instrument';

import express from 'express';
import * as Sentry from '@sentry/node';
import bodyParser from 'body-parser';
import helmet from 'helmet';

import v1Router from '@v1';
import corsMiddleware from '@/middlewares/cors';
import errorHandler from '@/middlewares/errorHandler';
import rateLimiter from '@/middlewares/rateLimiter';
import responseHandler from '@/middlewares/responseHandler';
import routeNotFoundHandler from '@/middlewares/routeNotFoundHandler';

const app = express();

//Middlewares
app.use(corsMiddleware());
app.use(helmet());
app.use(rateLimiter());
app.use(bodyParser.json());
app.use(responseHandler);

//Routers
app.use('/v1', v1Router);
app.get('/', (_, res) => {
  res.send('Blog Rest API');
});

app.get('*', routeNotFoundHandler);

//Error logger
Sentry.setupExpressErrorHandler(app);

//Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
