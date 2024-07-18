import { Request } from 'express';
import { param, query } from 'express-validator';
import _ from 'lodash';

import validate from '@/middlewares/validate';
import { PaginatationQuery } from '@/types/generics';

import Service from '../Services/Service';

export default class Controller<T extends Service = Service> {
  service: T;

  constructor(service: T) {
    this.service = service;
  }

  getUserFromRequest(req: Request) {
    return req.user;
  }

  getDataFromRequestBody<R extends Request, T>(req: R, keys: Array<keyof T>) {
    return _.pick(req.body, keys);
  }

  getPaginationQueryFromRequestQuery<R extends Request<any, any, any, PaginatationQuery>>(req: R) {
    return _.pick(req.query, ['page', 'limit']);
  }

  getResouceIdFromRequestParams<R extends Request>(req: R): string {
    return req.params.id;
  }

  validateResourceId(message: string) {
    return validate([
      param('id')
        .notEmpty()
        .withMessage('ID is required')
        .isUUID()
        .withMessage(message)
        .trim()
        .escape()
    ]);
  }

  validatePaginationQuery() {
    return validate([
      query('page').optional().trim().escape().toInt(),
      query('limit').optional().trim().escape().toInt()
    ]);
  }
}
