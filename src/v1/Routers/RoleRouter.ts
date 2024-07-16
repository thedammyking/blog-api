import express from 'express';

import RoleController from '@/v1/Controllers/RoleController';

const RoleRouter = express.Router();

const controller = new RoleController();

RoleRouter.post('/add', controller.createRole);

RoleRouter.get('/', controller.getRoles);

RoleRouter.get('/:id', controller.getRoleById);

RoleRouter.put('/:id', controller.updateRole);

RoleRouter.delete('/:id', controller.deleteRole);

export default RoleRouter;
