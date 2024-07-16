import { ErrorData } from '@/types/generics';

import ApiError from './ApiError';

export default class ThrottleRequestsError extends ApiError {
  constructor(data?: ErrorData, ...params: any[]) {
    super({ statusCode: 429, message: 'Slow down a bit and try again soon', ...data }, ...params);
  }
}
