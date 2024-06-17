import { NextFunction, Request, Response } from 'express';

import { ResponseStatus } from '@/types/generics';

const responseHandler = (req: Request, res: Response, next: NextFunction) => {
  res.success = data => {
    const response = {
      status: ResponseStatus.Success,
      data
    };
    return res.status(200).json(response);
  };

  res.error = error => {
    const { stack, data } = error;
    const response: any = {
      status: ResponseStatus.Error,
      data
    };

    const shouldShowStack = Boolean(req.query.debug ? Number(req.query.debug) : 0);

    res
      .status(data.statusCode)
      .json(
        Object.assign(
          response,
          (process.env.NODE_ENV === 'development' || shouldShowStack) && error.stack
            ? { stack }
            : {}
        )
      );
  };

  next();
};

export default responseHandler;
