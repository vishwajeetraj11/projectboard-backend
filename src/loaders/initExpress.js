import express from 'express';
import cors from 'cors';
import { projectRouter, taskRouter, userRouter } from '../api/index.js';
import { config } from '../config/index.js';
import morgan from 'morgan';
import { AppError } from '../utils/AppError.js';
import { globalErrorHandler } from '../api/controllers/errorController.js';
import helmet from 'helmet';

export const initExpress = ({ app }) => {
  app.use(helmet());
  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy');
  // The magic package that prevents frontend developers going nuts
  // Alternate description:
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());
  // cors({ origin: clientOrigins })

  // Development Logging
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  // Middleware that transforms the raw string of req.body into json
  app.use(express.json());
  // Load API routes
  app.use(`${config.api.prefix}/tasks`, taskRouter);
  app.use(`${config.api.prefix}/projects`, projectRouter);
  app.use(`${config.api.prefix}/users`, userRouter);

  // all runs for all http methods
  app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on the server!`, 404));
  });

  app.use(globalErrorHandler);
};
