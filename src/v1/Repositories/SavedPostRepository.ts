import { and, eq, isNull } from 'drizzle-orm';

import { savedPost } from '@/db/schema';

import Repository from './Repository';

export default class SavedPostRepository extends Repository<typeof savedPost> {
  constructor() {
    super(savedPost);
  }

  async getAllByReaderId(readerId: string) {
    return await this.db
      .select()
      .from(savedPost)
      .where(and(eq(this.schema.readerId, readerId), isNull(savedPost.deletedAt)));
  }
}
