import rateLimit from 'express-rate-limit';

import { ResponseStatus } from '@/types/generics';

export default () => {
  return rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 100, // Limit each IP to 100 requests per window
    message: {
      status: ResponseStatus.Error,
      data: {
        statusCode: 429,
        message: 'Too many requests from this IP, try again soon'
      }
    }
  });
};
