import { NextFunction, Request, Response } from 'express';
import { body, param, query } from 'express-validator';

import { authenticateToken, authorizeRoles } from '@/middlewares/auth';
import cacheControl from '@/middlewares/cacheControl';
import { validate } from '@/middlewares/validate';
import { CreateRoleData, Roles } from '@/types/entities/role';
import { PaginatationQuery } from '@/types/generics';
import RoleService from '@/v1/Services/RoleService';

class RoleController {
  private service = new RoleService();

  createRole = [
    authenticateToken,
    authorizeRoles([Roles.Admin, Roles.SuperAdmin]),
    validate([
      body('label').notEmpty().withMessage('Label is required').trim().escape(),
      body('value').notEmpty().withMessage('Value is required').trim().escape(),
      body('accessor').notEmpty().withMessage('Accessor is required').trim().escape()
    ]),
    async (req: Request<any, any, CreateRoleData>, res: Response, next: NextFunction) => {
      try {
        const data = await this.service.createRole(req.body);
        return res.success(data);
      } catch (error) {
        return next(error);
      }
    }
  ];

  getRoles = [
    cacheControl(60),
    validate([
      query('page').optional().trim().escape().toInt(),
      query('limit').optional().trim().escape().toInt()
    ]),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { data, meta } = await this.service.getRoles(
          req.user,
          req.query as PaginatationQuery
        );
        return res.success(data, meta);
      } catch (error) {
        return next(error);
      }
    }
  ];

  getRoleById = [
    cacheControl(60),
    validate([
      param('id')
        .notEmpty()
        .withMessage('ID is required')
        .isUUID()
        .withMessage('Role ID must be a valid UUID')
        .trim()
        .escape()
    ]),
    async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        const data = await this.service.getRoleById(id, req.user);
        return res.success(data);
      } catch (error) {
        return next(error);
      }
    }
  ];

  updateRole = [
    authenticateToken,
    authorizeRoles([Roles.Admin, Roles.SuperAdmin]),
    validate([
      param('id')
        .notEmpty()
        .withMessage('ID is required')
        .isUUID()
        .withMessage('Role ID must be a valid UUID')
        .trim()
        .escape(),
      body('label').optional().notEmpty().withMessage('Label is required').trim().escape(),
      body('value').optional().notEmpty().withMessage('Value is required').trim().escape()
    ]),
    async (
      req: Request<{ id: string }, any, Partial<CreateRoleData>>,
      res: Response,
      next: NextFunction
    ) => {
      try {
        const data = await this.service.updateRole(req.params.id, req.body);
        return res.success(data);
      } catch (error) {
        return next(error);
      }
    }
  ];

  deleteRole = [
    authenticateToken,
    authorizeRoles([Roles.Admin, Roles.SuperAdmin]),
    validate([
      param('id')
        .notEmpty()
        .withMessage('ID is required')
        .isUUID()
        .withMessage('Role ID must be a valid UUID')
        .trim()
        .escape()
    ]),
    async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
      try {
        const data = await this.service.deleteRole(req.params.id);
        return res.success(data);
      } catch (error) {
        return next(error);
      }
    }
  ];
}

export default RoleController;
