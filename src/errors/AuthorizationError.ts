import { ErrorData } from '@/types/generics';

import ApiError from './ApiError';

export default class AuthorizationError extends ApiError {
  constructor(data?: ErrorData, ...params: any[]) {
    super(
      {
        statusCode: 401,
        message: 'You are not authorised to access this resource.',
        ...data
      },
      ...params
    );
  }
}
