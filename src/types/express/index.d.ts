import { User } from '@supabase/supabase-js';

import APIError from '@/lib/error';

import 'express';

declare global {
  namespace Express {
    interface Response {
      success: (data: any) => void;
      error: (error: APIError) => void;
    }
    interface Request {
      user: User | null;
    }
  }
}
