import { sql } from 'drizzle-orm';
import { integer, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { TIMESTAMP_OPTIONS } from '@/data/constants';
import { Roles } from '@/types/entities/role';

export const role = pgTable('roles', {
  id: uuid('id').primaryKey().defaultRandom(),
  value: varchar('value', { enum: [Roles.Editor, Roles.Reader, Roles.SuperAdmin, Roles.Admin] })
    .unique()
    .notNull(),
  accessor: integer('accessor').notNull(),
  label: varchar('label').notNull(),
  createdAt: timestamp('created_at', TIMESTAMP_OPTIONS).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', TIMESTAMP_OPTIONS)
    .notNull()
    .defaultNow()
    .$onUpdate(() => sql`now()`),
  deletedAt: timestamp('deleted_at', TIMESTAMP_OPTIONS)
});

export const insertRoleSchema = createInsertSchema(role).pick({
  value: true,
  label: true,
  accessor: true
});

export const updateRoleSchema = insertRoleSchema.partial();

export const selectRoleSchema = createSelectSchema(role);
