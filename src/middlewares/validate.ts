import { NextFunction, Request, Response } from 'express';
import { ContextRunner } from 'express-validator';

import ValidationError from '@/errors/ValidationError';

export const validate = (validations: ContextRunner[]) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    for (const validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        return next(
          new ValidationError({
            fields: result.mapped()
          })
        );
      }
      return next();
    }
  };
};
