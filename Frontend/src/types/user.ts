export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'student' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}
