import { and, eq, isNull, sql } from 'drizzle-orm';

import { db } from '@/db';
import * as schema from '@/db/schema';
import { CreateRoleData } from '@/types/entities/role';

class RoleRepository {
  private db = db;

  async create(data: CreateRoleData) {
    return await this.db.insert(schema.role).values(data).returning();
  }

  async getAll() {
    return await this.db.select().from(schema.role).where(isNull(schema.role.deletedAt));
  }

  async getById(id: string) {
    return await this.db.query.role.findFirst({
      where: and(eq(schema.role.id, id), isNull(schema.role.deletedAt))
    });
  }

  async update(id: string, data: Partial<CreateRoleData>) {
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
}

export default RoleRepository;
