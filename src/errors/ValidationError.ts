import { ErrorData } from '@/types/generics';

import ApiError from './ApiError';

export default class ValidationError extends ApiError {
  constructor(data?: ErrorData, ...params: any[]) {
    super(
      {
        statusCode: 422,
        message: 'Some data failed validation in the request',
        ...data
      },
      ...params
    );
  }
}
