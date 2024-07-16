import { z } from 'zod';

import { insertPostSchema, selectPostSchema, updatePostSchema } from '@/db/schema';

export type Post = z.infer<typeof selectPostSchema>;

export type CreatePostData = z.infer<typeof insertPostSchema>;

export type UpdatePostData = z.infer<typeof updatePostSchema>;
