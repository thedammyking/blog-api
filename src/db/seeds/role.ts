import type { db } from '@/db';
import * as schema from '@/db/schema';
import { CreateRoleData } from '@/types/entities/role';

import roles from './data/roles.json';

export default async function seed(db: db) {
  await roles.map(async role => {
    await db.insert(schema.role).values(role as CreateRoleData);
  });
}
