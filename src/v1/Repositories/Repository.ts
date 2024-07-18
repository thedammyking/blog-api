import { and, count, desc, eq, isNull, not, Placeholder, SQL, sql } from 'drizzle-orm';
import { PgTableWithColumns } from 'drizzle-orm/pg-core';

import { db } from '@/db';
import { PaginatationQuery } from '@/types/generics';

export default class Repository<T extends PgTableWithColumns<any> = PgTableWithColumns<any>> {
  db: db;
  schema: T;

  constructor(schema: T) {
    this.db = db;
    this.schema = schema;
  }

  async create(data: {
    [Key in keyof T['$inferInsert']]:
      | SQL<unknown>
      | Placeholder<string, any>
      | T['$inferInsert'][Key];
  }) {
    return await this.db.insert(this.schema).values(data).returning();
  }

  async getAll(paginatation: Required<PaginatationQuery>) {
    return await this.db
      .select()
      .from(this.schema)
      .where(isNull(this.schema.deletedAt))
      .orderBy(desc(this.schema.createdAt))
      .limit(paginatation.limit)
      .offset((paginatation.page - 1) * paginatation.limit);
  }

  async getTotal() {
    return await this.db
      .select({
        total: count(this.schema.id)
      })
      .from(this.schema)
      .where(isNull(this.schema.deletedAt));
  }

  async getById(id: string) {
    return await this.db.query.role.findFirst({
      where: and(eq(this.schema.id, id), isNull(this.schema.deletedAt))
    });
  }

  async update(
    id: string,
    data: {
      [Key in keyof T['_']['columns']]?:
        | SQL<unknown>
        | (T['_']['columns'][Key]['_']['notNull'] extends true
            ? T['_']['columns'][Key]['_']['data']
            : T['_']['columns'][Key]['_']['data'] | null)
        | undefined;
    }
  ) {
    return await this.db
      .update(this.schema)
      .set(data)
      .where(and(eq(this.schema.id, id), isNull(this.schema.deletedAt)))
      .returning();
  }

  async delete(id: string) {
    return await this.db
      .update(this.schema)
      .set({ deletedAt: sql`now()` })
      .where(and(eq(this.schema.id, id), isNull(this.schema.deletedAt)))
      .returning();
  }

  async undelete(id: string) {
    return await this.db
      .update(this.schema)
      .set({ deletedAt: null })
      .where(and(eq(this.schema.id, id), not(isNull(this.schema.deletedAt))))
      .returning();
  }
}
