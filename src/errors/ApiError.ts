import { ErrorData } from '@/types/generics';

class ApiError extends Error {
  data: ErrorData;

  constructor(data?: ErrorData, ...params: any[]) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }

    this.data = this.generateErrorData(data);
  }

  private generateErrorData(data?: ErrorData) {
    return {
      statusCode: 500,
      message: 'Internal server error',
      ...data
    };
  }
}

export default ApiError;
