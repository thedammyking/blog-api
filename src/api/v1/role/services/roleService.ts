import { and, eq, isNull, sql } from 'drizzle-orm';

import { db } from '@/db';
import * as schema from '@/db/schema';
import APIError from '@/lib/error';
import { CreateRoleData } from '@/types/services/role';
import { createRoleDataValidator, updateRoleDataValidator } from '@/validators/services';

class RoleService {
  async createRole(data: CreateRoleData) {
    await createRoleDataValidator.parse(data);
    const role = await db.insert(schema.role).values(data).returning();
    if (!role) throw new APIError({ statusCode: 503, message: 'Failed to create role' });
    return role;
  }

  async getRoles() {
    const roles = await db.select().from(schema.role).where(isNull(schema.role.deletedAt));
    if (!roles) throw new APIError({ statusCode: 404, message: 'No roles found' });
    return roles;
  }

  async getRoleById(id: string) {
    const role = await db.query.role.findFirst({
      where: and(eq(schema.role.id, id), isNull(schema.role.deletedAt))
    });
    if (!role) throw new APIError({ statusCode: 404, message: 'Role not found' });
    return role;
  }

  async updateRole(id: string, data: Partial<CreateRoleData>) {
    await updateRoleDataValidator.parse(data);
    const role = await db
      .update(schema.role)
      .set(data)
      .where(and(eq(schema.role.id, id), isNull(schema.role.deletedAt)))
      .returning();
    if (!role) throw new APIError({ statusCode: 503, message: 'Failed to update role' });
    return role;
  }

  async deleteRole(id: string) {
    const role = await db
      .update(schema.role)
      .set({ deletedAt: sql`now()` })
      .where(and(eq(schema.role.id, id), isNull(schema.role.deletedAt)))
      .returning();
    if (!role) throw new APIError({ statusCode: 503, message: 'Failed to delete role' });
    return role;
  }
}

export default RoleService;
