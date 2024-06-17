import express from 'express';
import { param } from 'express-validator';

import { validate } from '@/middlewares/validate';

const router = express.Router();

router.get('/', (req, res) => {
  res.success({ hd: 'hdjsfd' });
});

router.get(
  '/:id',
  validate([param('id').isString().notEmpty().escape().trim().isUUID().withMessage('Invalid ID')]),
  (req, res) => {
    res.success({ hd: req.params.id });
  }
);

export default router;
