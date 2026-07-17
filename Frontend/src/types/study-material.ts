export interface StudyMaterial {
  id: string;
  title: string;
  subject: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  shortDescription: string;
  content: string;
  coverImage?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMaterialInput {
  title: string;
  subject: string;
  difficulty: string;
  shortDescription: string;
  content: string;
  coverImage?: string;
}
