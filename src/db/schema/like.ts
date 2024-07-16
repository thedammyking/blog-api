import { sql } from 'drizzle-orm';
import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';

import { TIMESTAMP_OPTIONS } from '@/data/constants';

import { post } from './post';

export const like = pgTable('likes', {
  id: uuid('id').primaryKey().defaultRandom(),
  readerId: uuid('reader_id').notNull(),
  postId: uuid('post_id')
    .notNull()
    .references(() => post.id),
  createdAt: timestamp('created_at', TIMESTAMP_OPTIONS).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', TIMESTAMP_OPTIONS)
    .notNull()
    .defaultNow()
    .$onUpdate(() => sql`now()`),
  deletedAt: timestamp('deleted_at', TIMESTAMP_OPTIONS)
});
