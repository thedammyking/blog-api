import { ErrorData } from '@/types/generics';

import ApiError from './ApiError';

export default class AuthenticationError extends ApiError {
  constructor(data?: ErrorData, ...params: any[]) {
    super(
      {
        statusCode: 401,
        message: 'Authentication is required.',
        ...data
      },
      ...params
    );
  }
}
