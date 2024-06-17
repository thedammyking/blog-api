import { ErrorData } from '@/types/generics';

class APIError extends Error {
  data: ErrorData;

  constructor(
    data: ErrorData = { statusCode: 500, message: 'Internal Server Error' },
    ...params: any[]
  ) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, APIError);
    }

    this.data = data;
  }
}

export default APIError;
