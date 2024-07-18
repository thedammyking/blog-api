import { and, eq, isNotNull, isNull, sql } from 'drizzle-orm';

import { db } from '@/db';
import * as schema from '@/db/schema';

export default class LikeRepository {
  private db = db;

  async add(readerId: string, postId: string) {
    return await this.db.insert(schema.like).values({ readerId, postId }).returning();
  }

  async update(readerId: string, postId: string) {
    return await this.db
      .update(schema.like)
      .set({ deletedAt: null })
      .where(
        and(
          eq(schema.like.readerId, readerId),
          eq(schema.like.postId, postId),
          isNotNull(schema.like.deletedAt)
        )
      )
      .returning();
  }

  async getAllByReaderId(readerId: string) {
    return await this.db
      .select()
      .from(schema.like)
      .where(and(eq(schema.like.readerId, readerId), isNull(schema.like.deletedAt)));
  }

  async getAllByPostId(postId: string) {
    return await this.db
      .select()
      .from(schema.like)
      .where(and(eq(schema.like.postId, postId), isNull(schema.like.deletedAt)));
  }

  async delete(readerId: string, postId: string) {
    return await this.db
      .update(schema.like)
      .set({ deletedAt: sql`now()` })
      .where(
        and(
          eq(schema.like.readerId, readerId),
          eq(schema.like.postId, postId),
          isNull(schema.like.deletedAt)
        )
      )
      .returning();
  }
}
