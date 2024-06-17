import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from '@/db/schema';
import env from '@/env';

import 'dotenv/config';

export const connection = postgres(env.DATABASE_URL, {
  prepare: false,
  max: env.DB_MIGRATING || env.DB_SEEDING ? 1 : undefined,
  onnotice: env.DB_SEEDING ? () => {} : undefined
});

export const db = drizzle(connection, {
  schema,
  logger: true
});

// eslint-disable-next-line no-redeclare
export type db = typeof db;

export default db;
