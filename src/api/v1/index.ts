import express from 'express';

import { authenticateToken } from '@/middlewares/auth';

import postRouter from './post';
import roleRouter from './role';

const router = express.Router();

router.use('/role', roleRouter);
router.use('/post', authenticateToken, postRouter);

export default router;
