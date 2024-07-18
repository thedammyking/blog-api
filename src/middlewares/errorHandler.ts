import { NextFunction, Request, Response } from 'express';

import ApiError from '@/errors/ApiError';

export default (err: ApiError, _req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) return next(err);

  if (err.data) res.error(err);
  else res.error(new ApiError({ message: 'Something went wrong' }));
};
