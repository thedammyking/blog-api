import { and, count, desc, eq, isNull, sql } from 'drizzle-orm';

import { db } from '@/db';
import * as schema from '@/db/schema';
import { CreatePostData } from '@/types/entities/post';
import { PaginatationQuery } from '@/types/generics';

class PostRepository {
  private db = db;

  async create(data: CreatePostData) {
    return await this.db.insert(schema.post).values(data).returning();
  }

  async getAll(paginatation: Required<PaginatationQuery>) {
    return await Promise.all([
      this.db
        .select()
        .from(schema.post)
        .where(isNull(schema.post.deletedAt))
        .orderBy(desc(schema.post.createdAt))
        .limit(paginatation.limit)
        .offset((paginatation.page - 1) * paginatation.limit),

      this.db
        .select({
          total: count(schema.post.id)
        })
        .from(schema.post)
        .where(isNull(schema.post.deletedAt))
    ]);
  }

  async getById(id: string) {
    return await this.db.query.role.findFirst({
      where: and(eq(schema.post.id, id), isNull(schema.post.deletedAt))
    });
  }

  async update(id: string, data: Partial<CreatePostData>) {
    return await this.db
      .update(schema.post)
      .set(data)
      .where(and(eq(schema.post.id, id), isNull(schema.post.deletedAt)))
      .returning();
  }

  async delete(id: string) {
    return await this.db
      .update(schema.post)
      .set({ deletedAt: sql`now()` })
      .where(and(eq(schema.post.id, id), isNull(schema.post.deletedAt)))
      .returning();
  }
}

export default PostRepository;
