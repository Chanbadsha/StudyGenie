export const DEFAULT_PAGE_SIZE = 12;

export const SORT_OPTIONS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Oldest', value: 'oldest' },
  { label: 'A-Z', value: 'az' },
  { label: 'Z-A', value: 'za' },
] as const;

export type SortOption = typeof SORT_OPTIONS[number]['value'];
