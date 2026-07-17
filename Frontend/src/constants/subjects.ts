export const SUBJECTS = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Computer Science',
  'History',
  'Geography',
  'Literature',
  'Economics',
  'Psychology',
  'Philosophy',
  'Art',
  'Music',
  'Languages',
  'Other',
] as const;

export type Subject = typeof SUBJECTS[number];
