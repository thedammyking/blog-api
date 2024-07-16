import { ErrorData } from '@/types/generics';

import ApiError from './ApiError';

export default class DeletingFailedError extends ApiError {
  constructor(data?: ErrorData, ...params: any[]) {
    super({ statusCode: 500, message: 'Delete could not be completed', ...data }, ...params);
  }
}
