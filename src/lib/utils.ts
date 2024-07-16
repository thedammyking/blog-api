import { Paginatation, PaginatationQuery } from '@/types/generics';

export const generatePaginationMeta = (
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
