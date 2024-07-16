import { NextFunction, Request, Response } from 'express';

import NotFoundError from '@/errors/NotFoundError';

const routeNotFoundHandler = (_req: Request, _res: Response, next: NextFunction) => {
  next(new NotFoundError({ message: 'Resource not found' }));
};

export default routeNotFoundHandler;
