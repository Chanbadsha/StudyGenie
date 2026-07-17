export interface AIGeneration {
  id: string;
  userId: string;
  topic: string;
  subject: string;
  difficulty: string;
  learningGoal: string;
  outputLength: string;
  response: string;
  model: string;
  createdAt: string;
}

export interface GenerateNotesInput {
  topic: string;
  subject: string;
  difficulty: string;
  learningGoal: string;
  outputLength: string;
}
