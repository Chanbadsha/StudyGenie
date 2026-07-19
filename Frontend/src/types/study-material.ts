export interface StudyMaterialAuthor {
  id: string;
  name: string;
  avatar?: string;
}

export interface StudyMaterial {
  id: string;
  title: string;
  subject: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  shortDescription: string;
  content?: string;
  coverImage?: string;
  createdBy: string | StudyMaterialAuthor;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMaterialInput {
  title: string;
  subject: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  shortDescription: string;
  content: string;
  coverImage?: string;
}
