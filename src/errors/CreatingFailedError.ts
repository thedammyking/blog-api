import { ErrorData } from '@/types/generics';

import ApiError from './ApiError';

export default class CreatingFailedError extends ApiError {
  constructor(data?: ErrorData, ...params: any[]) {
    super({ statusCode: 500, message: 'Create could not be completed', ...data }, ...params);
  }
}
