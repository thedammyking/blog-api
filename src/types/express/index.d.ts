import { User } from '@supabase/supabase-js';

import ApiError from '@/lib/error';

import 'express';

declare global {
  namespace Express {
    interface Response {
      success: <D = any, M = any>(data: D, meta?: M) => void;
      error: (error: ApiError) => void;
    }
    interface Request {
      user: User | null;
    }
  }
}
