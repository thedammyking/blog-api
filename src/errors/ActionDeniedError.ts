import { ErrorData } from '@/types/generics';

import ApiError from './ApiError';

export default class ActionDeniedError extends ApiError {
  constructor(data?: ErrorData, ...params: any[]) {
    super({ statusCode: 403, message: 'Action denied', ...data }, ...params);
  }
}
