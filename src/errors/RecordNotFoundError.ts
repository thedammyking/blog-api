import { ErrorData } from '@/types/generics';

import ApiError from './ApiError';

export default class RecordNotFoundError extends ApiError {
  constructor(data?: ErrorData, ...params: any[]) {
    super({ statusCode: 404, message: 'Record not found', ...data }, ...params);
  }
}
