import { z } from 'zod';

import { insertCommentSchema, selectCommentSchema, updateCommentSchema } from '@/db/schema';

export type Comment = z.infer<typeof selectCommentSchema>;

export type CreateCommentData = z.infer<typeof insertCommentSchema>;

export type UpdateCommentData = z.infer<typeof updateCommentSchema>;
