import { sql } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { TIMESTAMP_OPTIONS } from '@/data/constants';

import { post } from './post';

export const comment = pgTable('comments', {
  id: uuid('id').primaryKey().defaultRandom(),
  content: text('content').notNull(),
  readerId: uuid('reader_id').notNull(),
  postId: uuid('post_id')
    .notNull()
    .references(() => post.id),
  parentId: uuid('parent_id'),
  createdAt: timestamp('created_at', TIMESTAMP_OPTIONS).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', TIMESTAMP_OPTIONS)
    .notNull()
    .defaultNow()
    .$onUpdate(() => sql`now()`),
  deletedAt: timestamp('deleted_at', TIMESTAMP_OPTIONS)
});

export const insertCommentSchema = createInsertSchema(comment).pick({
  content: true,
  postId: true,
  readerId: true,
  parentId: true
});

export const updateCommentSchema = insertCommentSchema.partial();

export const selectCommentSchema = createSelectSchema(comment);
