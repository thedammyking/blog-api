import type { db } from '@/db';
import * as schema from '@/db/schema';
import env from '@/env';

import reactions from './data/reactions.json';

export default async function seed(db: db) {
  const posts = await db.query.post.findMany();
  const comments = await db.query.comment.findMany();

  if (posts.length > 0 && comments.length > 0)
    return await Promise.all([
      reactions.map(async reaction => {
        const randomPostIndex = Math.floor(Math.random() * posts.length);
        const post = posts[randomPostIndex];
        await db.insert(schema.reaction).values({
          ...reaction,
          readerId: env.SEED_READER_ID,
          resourceId: post.id
        });
      }),
      reactions.map(async reaction => {
        const randomCommentIndex = Math.floor(Math.random() * comments.length);
        const comment = comments[randomCommentIndex];
        await db.insert(schema.reaction).values({
          ...reaction,
          readerId: env.SEED_READER_ID,
          resourceId: comment.id
        });
      })
    ]);
}
