import express from 'express';
import RoleController from '@v1/role/controllers/roleController';

const router = express.Router();

const controllers = new RoleController();

router.post('/add', controllers.createRole);

router.get('/', controllers.getRoles);

router.get('/:id', controllers.getRoleById);

router.put('/:id', controllers.updateRole);

router.delete('/:id', controllers.deleteRole);

export default router;
