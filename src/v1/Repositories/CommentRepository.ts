import { and, count, desc, eq, isNull, sql } from 'drizzle-orm';

import { db } from '@/db';
import * as schema from '@/db/schema';
import { CreateCommentData, UpdateCommentData } from '@/types/entities/comment';
import { PaginatationQuery } from '@/types/generics';

class PostRepository {
  private db = db;

  async create(data: CreateCommentData) {
    return await this.db.insert(schema.comment).values(data).returning();
  }

  async getAll(paginatation: Required<PaginatationQuery>) {
    return await Promise.all([
      this.db
        .select()
        .from(schema.comment)
        .where(isNull(schema.comment.deletedAt))
        .orderBy(desc(schema.comment.createdAt))
        .limit(paginatation.limit)
        .offset((paginatation.page - 1) * paginatation.limit),

      this.db
        .select({
          total: count(schema.comment.id)
        })
        .from(schema.comment)
        .where(isNull(schema.comment.deletedAt))
    ]);
  }

  async getById(id: string) {
    return await this.db.query.role.findFirst({
      where: and(eq(schema.comment.id, id), isNull(schema.comment.deletedAt))
    });
  }

  async update(id: string, data: UpdateCommentData) {
    return await this.db
      .update(schema.comment)
      .set(data)
      .where(and(eq(schema.comment.id, id), isNull(schema.comment.deletedAt)))
      .returning();
  }

  async delete(id: string) {
    return await this.db
      .update(schema.comment)
      .set({ deletedAt: sql`now()` })
      .where(and(eq(schema.comment.id, id), isNull(schema.comment.deletedAt)))
      .returning();
  }
}

export default PostRepository;
