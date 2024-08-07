import { getTableName, sql, Table } from 'drizzle-orm';

import { connection, db } from '@/db';
import * as schema from '@/db/schema';
import env from '@/env';

import * as seeds from './seeds';

if (!env.DB_SEEDING) {
  throw new Error('You must set DB_SEEDING to "true" when running seeds');
}

async function resetTable(db: db, table: Table) {
  return db.execute(sql.raw(`TRUNCATE TABLE ${getTableName(table)} RESTART IDENTITY CASCADE`));
}

(async () => {
  for (const table of [
    schema.reaction,
    schema.savedPost,
    schema.post,
    schema.comment,
    schema.role
  ]) {
    // await db.delete(table); // clear tables without truncating / resetting ids
    await resetTable(db, table);
  }

  await seeds.role(db);
  await seeds.post(db);
  await seeds.comment(db);
  await seeds.reaction(db);
  await connection.end();
})();
