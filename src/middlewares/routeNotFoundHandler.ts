import { NextFunction, Request, Response } from 'express';

import APIError from '@/lib/error';

const routeNotFoundHandler = (_: Request, _1: Response, next: NextFunction) => {
  next(new APIError({ statusCode: 404, message: 'Path not found' }));
};

export default routeNotFoundHandler;
