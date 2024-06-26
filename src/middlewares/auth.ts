import { NextFunction, Request, Response } from 'express';

import supabase from '@/config/supabase';
import APIError from '@/lib/error';

export async function authenticateToken(req: Request, _res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) throw new APIError({ statusCode: 401, message: 'Token missing' });

    const response = await supabase.auth.getUser(token);

    if (response.error) throw new APIError({ statusCode: 401, message: 'Invalid token' });

    req.user = response.data.user;
    next();
  } catch (err) {
    next(err);
  }
}

export const authorizeRoles =
  (roles: string[]) => async (req: Request, _res: Response, next: NextFunction) => {
    const user = req.user;
    if (user?.user_metadata?.role?.value && !roles.includes(user?.user_metadata?.role?.value)) {
      return next(new APIError({ statusCode: 403, message: 'Action Not Allowed' }));
    }
    return next();
  };
