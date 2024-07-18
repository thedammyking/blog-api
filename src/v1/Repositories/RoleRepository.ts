import { and, desc, eq, isNull, lte } from 'drizzle-orm';

import * as schema from '@/db/schema';
import { Role, Roles } from '@/types/entities/role';
import { PaginatationQuery } from '@/types/generics';

import Repository from './Repository';

export default class RoleRepository extends Repository<typeof schema.role> {
  constructor() {
    super(schema.role);
  }

  async getAllRoles(paginatation: Required<PaginatationQuery>, accessor: Role['accessor']) {
    return await this.db
      .select()
      .from(this.schema)
      .where(and(isNull(this.schema.deletedAt), lte(this.schema.accessor, accessor)))
      .orderBy(desc(this.schema.createdAt))
      .limit(paginatation.limit)
      .offset((paginatation.page - 1) * paginatation.limit);
  }

  async getByRoleId(id: string, accessor: Role['accessor']) {
    return await this.db.query.role.findFirst({
      where: and(
        eq(this.schema.id, id),
        isNull(this.schema.deletedAt),
        lte(this.schema.accessor, accessor)
      )
    });
  }

  async getByValue(value: Roles) {
    return await this.db.query.role.findFirst({
      where: and(eq(schema.role.value, value))
    });
  }
}
