import { PgTimestampConfig } from 'drizzle-orm/pg-core';

import { Roles } from '@/types/entities/role';

export const TIMESTAMP_OPTIONS: PgTimestampConfig = { mode: 'string', withTimezone: true };

export const ROLES_ACCESSIBLE_TO_UNAUTHENTICATED = [Roles.Reader];
export const ROLES_ACCESSIBLE_TO_ADMIN = [Roles.Reader, Roles.Editor, Roles.SuperAdmin];
