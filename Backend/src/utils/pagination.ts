export interface PaginationParams {
  page: number;
  limit: number;
  skip: number;
}

export interface PaginationResult {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export function getPaginationParams(queryPage?: string, queryLimit?: string, defaultLimit = 12): PaginationParams {
  const page = Math.max(1, parseInt(queryPage || '1', 10) || 1);
  const limit = Math.min(50, Math.max(1, parseInt(queryLimit || String(defaultLimit), 10) || defaultLimit));
  const skip = (page - 1) * limit;

  return { page, limit, skip };
}

export function getPaginationResult(total: number, page: number, limit: number): PaginationResult {
  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
}
