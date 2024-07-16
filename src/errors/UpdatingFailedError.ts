import { ErrorData } from '@/types/generics';

import ApiError from './ApiError';

export default class UpdatingFailedError extends ApiError {
  constructor(data?: ErrorData, ...params: any[]) {
    super({ statusCode: 500, message: 'Update could not be completed', ...data }, ...params);
  }
}
