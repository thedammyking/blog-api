import { reaction } from '@/db/schema';

import Repository from './Repository';

export default class ReactionRepository extends Repository<typeof reaction> {
  constructor() {
    super(reaction);
  }
}
