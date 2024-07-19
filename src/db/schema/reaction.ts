import { sql } from 'drizzle-orm';
import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { TIMESTAMP_OPTIONS } from '@/data/constants';

export const reaction = pgTable('reactions', {
  id: uuid('id').primaryKey().defaultRandom(),
  emoji: varchar('emoji').notNull(),
  readerId: uuid('reader_id').notNull(),
  resourceId: uuid('resource_id').notNull(),
  createdAt: timestamp('created_at', TIMESTAMP_OPTIONS).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', TIMESTAMP_OPTIONS)
    .notNull()
    .defaultNow()
    .$onUpdate(() => sql`now()`),
  deletedAt: timestamp('deleted_at', TIMESTAMP_OPTIONS)
});
