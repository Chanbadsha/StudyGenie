export interface DashboardStats {
  totalMaterials: number;
  totalGenerations: number;
  totalChatSessions: number;
  favoriteSubject?: string;
  totalStudyMinutes: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    color?: string;
  }[];
}
