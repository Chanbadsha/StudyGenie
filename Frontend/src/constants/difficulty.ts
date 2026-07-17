export const DIFFICULTY_LEVELS = ['Beginner', 'Intermediate', 'Advanced'] as const;

export type Difficulty = typeof DIFFICULTY_LEVELS[number];
