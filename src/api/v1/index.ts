import express from 'express';
import PostRouter from '@v1/Routers/PostRouter';
import RoleRouter from '@v1/Routers/RoleRouter';

import { authenticateToken } from '@/middlewares/auth';

const ApiRouter = express.Router();

ApiRouter.use('/roles', RoleRouter);
ApiRouter.use('/posts', authenticateToken, PostRouter);

export default ApiRouter;
