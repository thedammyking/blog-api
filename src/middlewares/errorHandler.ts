import { NextFunction, Request, Response } from 'express';

import APIError from '../lib/error';

const errorHandler = (err: APIError, _: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }
  res.error(err);
};

export default errorHandler;
