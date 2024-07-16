import { ErrorData } from '@/types/generics';

import ApiError from './ApiError';

export default class InvalidArgumentError extends ApiError {
  constructor(data?: ErrorData, ...params: any[]) {
    super(
      {
        statusCode: 400,
        message: 'You provided some invalid input value',
        ...data
      },
      ...params
    );
  }
}
