import express, { Request, Response } from 'express';

import { authorizeRoles } from '@/middlewares/auth';

const router = express.Router();

router.get('/', (req, res) => {
  res.success({ hd: 'hdjsfd' });
});

router.get('/add', [
  authorizeRoles(['admin']),
  (req: Request, res: Response) => {
    res.success({ hd: 'hdjsfd' });
  }
]);

export default router;
