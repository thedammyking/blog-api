import { ErrorData } from '@/types/generics';

import ApiError from './ApiError';

export default class NotFoundError extends ApiError {
  constructor(data?: ErrorData, ...params: any[]) {
    super(
      { statusCode: 404, message: 'Could not find what you were looking for.', ...data },
      ...params
    );
  }
}
