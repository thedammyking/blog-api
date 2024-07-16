import express, { Request, Response } from 'express';

import { authorizeRoles } from '@/middlewares/auth';
import { Roles } from '@/types/entities/role';

const PostRouter = express.Router();

PostRouter.get('/', (req, res) => {
  res.success({ hd: 'hdjsfd' });
});

PostRouter.get('/add', [
  authorizeRoles([Roles.Editor, Roles.Admin, Roles.SuperAdmin]),
  (req: Request, res: Response) => {
    res.success({ hd: 'hdjsfd' });
  }
]);

export default PostRouter;
