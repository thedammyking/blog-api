import { ErrorData } from '@/types/generics';

import ApiError from './ApiError';

export default class ResourceExistsError extends ApiError {
  constructor(data?: ErrorData, ...params: any[]) {
    super({ statusCode: 400, message: 'Resource exists already', ...data }, ...params);
  }
}
