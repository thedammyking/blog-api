export enum ResponseStatus {
  Error = 'error',
  Success = 'success'
}

export type ErrorData = {
  statusCode: number;
  message: string;
  description?: string;
  error?: Record<string, any>;
};
