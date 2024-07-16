import express from 'express';

import { authenticateToken } from '@/middlewares/auth';
import PostRouter from '@/v1/Routers/PostRouter';
import RoleRouter from '@/v1/Routers/RoleRouter';

const ApiRouter = express.Router();

ApiRouter.use('/roles', RoleRouter);
ApiRouter.use('/posts', authenticateToken, PostRouter);

export default ApiRouter;
