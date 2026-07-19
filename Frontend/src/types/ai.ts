export interface AIGeneration {
  id: string;
  userId: string;
  type: 'Notes';
  topic: string;
  subject: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  learningGoal: string;
  outputLength: 'Short' | 'Medium' | 'Long';
  response: string;
  aiModel: string;
  materialId?: string;
  createdAt: string;
}

export interface GenerateNotesInput {
  topic: string;
  subject: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  learningGoal: string;
  outputLength: 'Short' | 'Medium' | 'Long';
}
