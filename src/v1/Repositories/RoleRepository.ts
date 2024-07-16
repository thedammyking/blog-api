import { and, count, desc, eq, isNull, lte, not, sql } from 'drizzle-orm';

import { db } from '@/db';
import * as schema from '@/db/schema';
import { CreateRoleData, Role, Roles, UpdateRoleData } from '@/types/entities/role';
import { PaginatationQuery } from '@/types/generics';

class RoleRepository {
  private db = db;

  async create(data: CreateRoleData) {
    return await this.db.insert(schema.role).values(data).returning();
  }

  async getAll(paginatation: Required<PaginatationQuery>, accessor: Role['accessor']) {
    return await Promise.all([
      this.db
        .select()
        .from(schema.role)
        .where(and(isNull(schema.role.deletedAt), lte(schema.role.accessor, accessor)))
        .orderBy(desc(schema.role.createdAt))
        .limit(paginatation.limit)
        .offset((paginatation.page - 1) * paginatation.limit),

      this.db
        .select({
          total: count(schema.role.id)
        })
        .from(schema.role)
        .where(and(isNull(schema.role.deletedAt), lte(schema.role.accessor, accessor)))
    ]);
  }

  async getById(id: string, accessor: Role['accessor']) {
    return await this.db.query.role.findFirst({
      where: and(
        eq(schema.role.id, id),
        isNull(schema.role.deletedAt),
        lte(schema.role.accessor, accessor)
      )
    });
  }

  async getByValue(value: Roles) {
    return await this.db.query.role.findFirst({
      where: and(eq(schema.role.value, value))
    });
  }

  async update(id: string, data: UpdateRoleData) {
    return await this.db
      .update(schema.role)
      .set(data)
      .where(and(eq(schema.role.id, id), isNull(schema.role.deletedAt)))
      .returning();
  }

  async delete(id: string) {
    return await this.db
      .update(schema.role)
      .set({ deletedAt: sql`now()` })
      .where(and(eq(schema.role.id, id), isNull(schema.role.deletedAt)))
      .returning();
  }

  async undelete(id: string) {
    return await this.db
      .update(schema.role)
      .set({ deletedAt: null })
      .where(and(eq(schema.role.id, id), not(isNull(schema.role.deletedAt))))
      .returning();
  }
}

export default RoleRepository;
