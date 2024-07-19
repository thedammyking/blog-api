import type { db } from '@/db';
import * as schema from '@/db/schema';
import env from '@/env';

import comments from './data/comments.json';

export default async function seed(db: db) {
  const posts = await db.query.post.findMany();

  if (posts.length > 0)
    await comments.map(async comment => {
      const randomPostIndex = Math.floor(Math.random() * posts.length);
      const post = posts[randomPostIndex];
      const [insertedComment] = await db
        .insert(schema.comment)
        .values({
          ...comment,
          readerId: env.SEED_READER_ID,
          postId: post.id
        })
        .returning();
      const randomCommentIndex = Math.floor(Math.random() * comments.length);
      await comments.slice(0, randomCommentIndex).map(async comment => {
        await db.insert(schema.comment).values({
          ...comment,
          readerId: env.SEED_READER_ID,
          postId: post.id,
          parentId: insertedComment.id
        });
      });
    });
}
