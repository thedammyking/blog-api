import { NextFunction, Request, Response } from 'express';

import supabase from '@/config/supabase';
import ActionDeniedError from '@/errors/ActionDeniedError';
import AuthorizationError from '@/errors/AuthorizationError';
import { Roles } from '@/types/entities/role';

export async function authenticateToken(req: Request, _res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) throw new AuthorizationError();

    const response = await supabase.auth.getUser(token);

    if (response.error) throw new AuthorizationError();

    req.user = response.data.user;
    next();
  } catch (err) {
    next(err);
  }
}

export const authorizeRoles =
  (roles: Roles[]) => async (req: Request, _res: Response, next: NextFunction) => {
    const user = req.user;
    if (user?.user_metadata?.role?.value && !roles.includes(user?.user_metadata?.role?.value)) {
      return next(new ActionDeniedError());
    }
    return next();
  };
