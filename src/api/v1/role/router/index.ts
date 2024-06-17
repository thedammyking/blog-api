import express from 'express';
import RoleController from '@v1/role/controllers/roleController';

import cacheControl from '@/middlewares/cacheControl';

const router = express.Router();

const controllers = new RoleController();

router.post('/add', controllers.createRole);

router.get('/', cacheControl(60), controllers.getRoles);

router.get('/:id', cacheControl(60), controllers.getRoleById);

router.put('/:id', controllers.updateRole);

router.delete('/:id', controllers.deleteRole);

export default router;
