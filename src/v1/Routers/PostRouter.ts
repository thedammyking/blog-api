import express, { Request, Response } from 'express';

import { authorizeRoles } from '@/middlewares/auth';

const PostRouter = express.Router();

PostRouter.get('/', (req, res) => {
  res.success({ hd: 'hdjsfd' });
});

PostRouter.get('/add', [
  authorizeRoles(['admin']),
  (req: Request, res: Response) => {
    res.success({ hd: 'hdjsfd' });
  }
]);

export default PostRouter;
