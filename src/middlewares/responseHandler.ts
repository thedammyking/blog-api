import { NextFunction, Request, Response } from 'express';

import ApiError from '@/errors/ApiError';
import { ResponseStatus } from '@/types/generics';

const responseHandler = (req: Request, res: Response, next: NextFunction) => {
  res.success = (data, meta) =>
    res.status(200).json({
      status: ResponseStatus.Success,
      data,
      meta
    });

  res.error = error => {
    let data: any = {
      statusCode: 500,
      message: error.message || 'Internal Server Error'
    };
    const shouldShowStack = Boolean(req.query.debug ? Number(req.query.debug) : 0);

    if (error instanceof ApiError) data = error.data;

    if (process.env.NODE_ENV === 'development' || shouldShowStack) data.stack = error.stack;

    return res.status(data.statusCode).json({
      status: ResponseStatus.Error,
      error: data
    });
  };

  next();
};

export default responseHandler;
