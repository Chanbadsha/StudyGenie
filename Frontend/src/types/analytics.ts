export interface DashboardStats {
  totalMaterials: number;
  totalGenerations: number;
  totalChatSessions: number;
  subjectDistribution: SubjectDistribution[];
}

export interface SubjectDistribution {
  subject: string;
  count: number;
}

export interface LearningProgress {
  monthlyMaterials: MonthlyData[];
  monthlyGenerations: MonthlyData[];
}

export interface MonthlyData {
  month: string;
  count: number;
}
