import { post } from '@/db/schema';

import Repository from './Repository';

export default class PostRepository extends Repository<typeof post> {
  constructor() {
    super(post);
  }
}
