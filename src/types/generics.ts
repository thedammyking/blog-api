import { Request } from 'express';

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

export type RequestWithID = Request<{ id: string }>;

export interface RequestWithData<T> extends Request<any, any, T> {}

export interface RequestWithIDAndData<T> extends Request<{ id: string }, any, T> {}
