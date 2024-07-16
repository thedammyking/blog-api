export enum ResponseStatus {
  Error = 'error',
  Success = 'success'
}

export type ErrorData = {
  statusCode?: number;
  message?: string;
  description?: string;
  fields?: Record<string, any>;
};

export type Paginatation = {
  currentPage: number;
  totalPages: number;
  limit: number;
  total: number;
};

export type PaginatationQuery = {
  page?: number;
  limit?: number;
};
