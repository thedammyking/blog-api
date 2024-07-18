import { NextFunction, Request, Response } from 'express';

import NotFoundError from '@/errors/NotFoundError';

export default (_req: Request, _res: Response, next: NextFunction) => {
  next(new NotFoundError({ message: 'Resource not found' }));
};
