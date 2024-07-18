import { Paginatation, PaginatationQuery } from '@/types/generics';

import Repository from '../Repositories/Repository';

export default class Service<T extends Repository = Repository> {
  repository: T;

  constructor(repository: T) {
    this.repository = repository;
  }

  generatePaginationMeta = (
    count: {
      total: number;
    },
    paginatation: Required<PaginatationQuery>
  ): Paginatation => {
    return {
      total: count.total,
      currentPage: paginatation.page,
      limit: paginatation.limit,
      totalPages: Math.ceil(count.total / paginatation.limit)
    };
  };
}
