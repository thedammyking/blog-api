import { PgTimestampConfig } from 'drizzle-orm/pg-core';

export const TIMESTAMP_OPTIONS: PgTimestampConfig = { mode: 'string', withTimezone: true };

export const PAGINATION_DEFAULT = {
  limit: 10,
  page: 1
};
