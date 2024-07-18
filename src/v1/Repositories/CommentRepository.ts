import * as schema from '@/db/schema';

import Repository from './Repository';

export default class CommentRepository extends Repository<typeof schema.comment> {
  constructor() {
    super(schema.comment);
  }
}
