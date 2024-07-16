import { sql } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

import { TIMESTAMP_OPTIONS } from '@/data/constants';

export const post = pgTable('posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  excerpt: text('excerpt').notNull(),
  body: text('body').notNull(),
  featuredImage: text('featured_image').notNull(),
  authorId: uuid('author_id').notNull(),
  createdAt: timestamp('created_at', TIMESTAMP_OPTIONS).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', TIMESTAMP_OPTIONS)
    .notNull()
    .defaultNow()
    .$onUpdate(() => sql`now()`),
  deletedAt: timestamp('deleted_at', TIMESTAMP_OPTIONS)
});
