import { comment } from '@/db/schema';

import Repository from './Repository';

export default class CommentRepository extends Repository<typeof comment> {
  constructor() {
    super(comment);
  }
}
