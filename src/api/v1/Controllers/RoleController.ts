import { NextFunction, Request, Response } from 'express';
import { body, param } from 'express-validator';
import RoleService from '@v1/Services/RoleService';

import { authenticateToken, authorizeRoles } from '@/middlewares/auth';
import { validate } from '@/middlewares/validate';
import { CreateRoleData } from '@/types/entities/role';

class RoleController {
  private service = new RoleService();

  createRole = [
    authenticateToken,
    authorizeRoles(['admin']),
    validate([
      body('label').notEmpty().withMessage('Label is required').trim().escape(),
      body('value').notEmpty().withMessage('Value is required').trim().escape()
    ]),
    async (req: Request<any, any, CreateRoleData>, res: Response, next: NextFunction) => {
      try {
        const { label, value } = req.body;
        const role = await this.service.createRole({ value, label });
        return res.success(role);
      } catch (error) {
        return next(error);
      }
    }
  ];

  getRoles = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const role = await this.service.getRoles(req.user);
      return res.success(role);
    } catch (error) {
      return next(error);
    }
  };

  getRoleById = [
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
        const role = await this.service.getRoleById(id, req.user);
        return res.success(role);
      } catch (error) {
        return next(error);
      }
    }
  ];

  updateRole = [
    authenticateToken,
    authorizeRoles(['admin']),
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
        const { id } = req.params;
        const { label, value } = req.body;
        const role = await this.service.updateRole(id, { value, label });
        return res.success(role);
      } catch (error) {
        return next(error);
      }
    }
  ];

  deleteRole = [
    authenticateToken,
    authorizeRoles(['admin']),
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
        const role = await this.service.deleteRole(id);
        return res.success(role);
      } catch (error) {
        return next(error);
      }
    }
  ];
}

export default RoleController;
