import * as schema from '@/db/schema';

import Repository from './Repository';

export default class PostRepository extends Repository<typeof schema.post> {
  constructor() {
    super(schema.post);
  }
}
