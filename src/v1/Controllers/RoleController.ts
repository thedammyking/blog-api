import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';

import { authenticateToken, authorizeRoles } from '@/middlewares/auth';
import cacheControl from '@/middlewares/cacheControl';
import validate from '@/middlewares/validate';
import { CreateRoleData, Roles } from '@/types/entities/role';
import { RequestWithData, RequestWithID, RequestWithIDAndData } from '@/types/generics';
import RoleService from '@/v1/Services/RoleService';

import Controller from './Controller';

export default class RoleController extends Controller<RoleService> {
  constructor() {
    super(new RoleService());
  }

  getRoleDataFromRequestBody<R extends Request>(req: R) {
    return this.getDataFromRequestBody(req, ['accessor', 'label', 'value']);
  }

  creationAndUpdateAuthotization() {
    return authorizeRoles([Roles.Admin, Roles.SuperAdmin]);
  }

  createRole = [
    authenticateToken,
    this.creationAndUpdateAuthotization(),
    validate([
      body('label').notEmpty().withMessage('Label is required').trim().escape(),
      body('value').notEmpty().withMessage('Value is required').trim().escape(),
      body('accessor').notEmpty().withMessage('Accessor is required').trim().escape()
    ]),
    async (req: RequestWithData<CreateRoleData>, res: Response, next: NextFunction) => {
      try {
        const data = await this.service.createRole(this.getRoleDataFromRequestBody(req));
        return res.success(data);
      } catch (error) {
        return next(error);
      }
    }
  ];

  getRoles = [
    cacheControl(60),
    this.validatePaginationQuery(),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { data, meta } = await this.service.getRoles(
          this.getUserFromRequest(req),
          this.getPaginationQueryFromRequestQuery(req)
        );
        return res.success(data, meta);
      } catch (error) {
        return next(error);
      }
    }
  ];

  getRoleById = [
    cacheControl(60),
    this.validateResourceId('Role ID must be a valid UUID'),
    async (req: RequestWithID, res: Response, next: NextFunction) => {
      try {
        const data = await this.service.getRoleById(
          this.getResouceIdFromRequestParams(req),
          this.getUserFromRequest(req)
        );
        return res.success(data);
      } catch (error) {
        return next(error);
      }
    }
  ];

  updateRole = [
    authenticateToken,
    this.creationAndUpdateAuthotization(),
    this.validateResourceId('Role ID must be a valid UUID'),
    validate([
      body('label').optional().notEmpty().withMessage('Label is required').trim().escape(),
      body('value').optional().notEmpty().withMessage('Value is required').trim().escape()
    ]),
    async (
      req: RequestWithIDAndData<Partial<CreateRoleData>>,
      res: Response,
      next: NextFunction
    ) => {
      try {
        const data = await this.service.updateRole(
          this.getResouceIdFromRequestParams(req),
          this.getRoleDataFromRequestBody(req)
        );
        return res.success(data);
      } catch (error) {
        return next(error);
      }
    }
  ];

  deleteRole = [
    authenticateToken,
    this.creationAndUpdateAuthotization(),
    this.validateResourceId('Role ID must be a valid UUID'),
    async (req: RequestWithID, res: Response, next: NextFunction) => {
      try {
        const data = await this.service.deleteRole(this.getResouceIdFromRequestParams(req));
        return res.success(data);
      } catch (error) {
        return next(error);
      }
    }
  ];
}
