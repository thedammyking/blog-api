import { and, eq, isNotNull, isNull, sql } from 'drizzle-orm';

import { db } from '@/db';
import * as schema from '@/db/schema';

export default class SavedPostRepository {
  private db = db;

  async add(readerId: string, postId: string) {
    return await this.db.insert(schema.savedPost).values({ readerId, postId }).returning();
  }

  async update(readerId: string, postId: string) {
    return await this.db
      .update(schema.savedPost)
      .set({ deletedAt: null })
      .where(
        and(
          eq(schema.savedPost.readerId, readerId),
          eq(schema.savedPost.postId, postId),
          isNotNull(schema.savedPost.deletedAt)
        )
      )
      .returning();
  }

  async getAllByReaderId(readerId: string) {
    return await this.db
      .select()
      .from(schema.savedPost)
      .where(and(eq(schema.savedPost.readerId, readerId), isNull(schema.savedPost.deletedAt)));
  }

  async getAllByPostId(postId: string) {
    return await this.db
      .select()
      .from(schema.savedPost)
      .where(and(eq(schema.savedPost.postId, postId), isNull(schema.savedPost.deletedAt)));
  }

  async delete(readerId: string, postId: string) {
    return await this.db
      .update(schema.savedPost)
      .set({ deletedAt: sql`now()` })
      .where(
        and(
          eq(schema.savedPost.readerId, readerId),
          eq(schema.savedPost.postId, postId),
          isNull(schema.savedPost.deletedAt)
        )
      )
      .returning();
  }
}
