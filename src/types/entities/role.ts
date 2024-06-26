import { z } from 'zod';

import { insertRoleSchema, selectRoleSchema, updateRoleSchema } from '@/db/schema';

export type Role = z.infer<typeof selectRoleSchema>;

export type CreateRoleData = z.infer<typeof insertRoleSchema>;

export type UpdateRoleData = z.infer<typeof updateRoleSchema>;

export enum Roles {
  Editor = 'editor',
  SuperAdmin = 'super-admin',
  Reader = 'reader'
}
