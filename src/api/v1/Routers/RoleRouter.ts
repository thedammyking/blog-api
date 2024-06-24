import express from 'express';
import RoleController from '@v1/Controllers/RoleController';

import cacheControl from '@/middlewares/cacheControl';

const RoleRouter = express.Router();

const controller = new RoleController();

RoleRouter.post('/add', controller.createRole);

RoleRouter.get('/', cacheControl(60), controller.getRoles);

RoleRouter.get('/:id', cacheControl(60), controller.getRoleById);

RoleRouter.put('/:id', controller.updateRole);

RoleRouter.delete('/:id', controller.deleteRole);

export default RoleRouter;
