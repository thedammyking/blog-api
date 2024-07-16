import { ErrorData } from '@/types/generics';

import ApiError from './ApiError';

export default class UnexpectedValueError extends ApiError {
  constructor(data?: ErrorData, ...params: any[]) {
    super(
      {
        statusCode: 422,
        message: 'You provided an unexpected type for one or more of your input values',
        ...data
      },
      ...params
    );
  }
}
