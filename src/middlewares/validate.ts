import { NextFunction, Request, Response } from 'express';
import { ContextRunner } from 'express-validator';

import APIError from '@/lib/error';

export const validate = (validations: ContextRunner[]) => {
  return async (req: Request, _: Response, next: NextFunction) => {
    for (const validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        return next(
          new APIError({
            message: 'Input validation failed',
            statusCode: 422,
            error: result.mapped()
          })
        );
      }
      return next();
    }
  };
};
