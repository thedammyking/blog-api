import { sql } from 'drizzle-orm';
import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { TIMESTAMP_OPTIONS } from '@/data/constants';
import { Roles } from '@/types/entities/role';

export const role = pgTable('roles', {
  id: uuid('id').primaryKey().defaultRandom(),
  value: varchar('value', { enum: [Roles.Editor, Roles.SuperAdmin, Roles.Reader] })
    .unique()
    .notNull(),
  label: varchar('label').notNull(),
  createdAt: timestamp('created_at', TIMESTAMP_OPTIONS).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', TIMESTAMP_OPTIONS)
    .notNull()
    .defaultNow()
    .$onUpdate(() => sql`now()`),
  deletedAt: timestamp('deleted_at', TIMESTAMP_OPTIONS)
});

export const insertRoleSchema = createInsertSchema(role).pick({ value: true, label: true });

export const updateRoleSchema = insertRoleSchema.partial();

export const selectRoleSchema = createSelectSchema(role);
