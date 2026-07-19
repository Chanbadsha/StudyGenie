import { Material } from '../models/material.model';
import { AIGeneration } from '../models/ai-generation.model';
import { ChatSession } from '../models/chat-session.model';
import { toObjectId } from '../utils/object-id';

export interface DashboardStats {
  totalMaterials: number;
  totalGenerations: number;
  totalChatSessions: number;
  subjectDistribution: { subject: string; count: number }[];
}

export interface LearningProgress {
  monthlyMaterials: { month: string; count: number }[];
  monthlyGenerations: { month: string; count: number }[];
}

function getMonthsBack(count: number): Date[] {
  const months: Date[] = [];
  const now = new Date();
  for (let i = count - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push(d);
  }
  return months;
}

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatMonth(date: Date): string {
  return `${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;
}

export const analyticsService = {
  async getDashboardStats(userId: string): Promise<DashboardStats> {
    const userObjectId = toObjectId(userId);

    const [totalMaterials, totalGenerations, totalChatSessions, subjectDistribution] =
      await Promise.all([
        Material.countDocuments({ createdBy: userObjectId }),
        AIGeneration.countDocuments({ userId: userObjectId }),
        ChatSession.countDocuments({ userId: userObjectId }),
        Material.aggregate([
          { $match: { createdBy: userObjectId } },
          { $group: { _id: '$subject', count: { $sum: 1 } } },
          { $project: { _id: 0, subject: '$_id', count: 1 } },
          { $sort: { count: -1 } },
        ]),
      ]);

    return {
      totalMaterials,
      totalGenerations,
      totalChatSessions,
      subjectDistribution,
    };
  },

  async getSubjectDistribution(userId: string): Promise<{ subject: string; count: number }[]> {
    const userObjectId = toObjectId(userId);

    return Material.aggregate([
      { $match: { createdBy: userObjectId } },
      { $group: { _id: '$subject', count: { $sum: 1 } } },
      { $project: { _id: 0, subject: '$_id', count: 1 } },
      { $sort: { count: -1 } },
    ]);
  },

  async getLearningProgress(userId: string): Promise<LearningProgress> {
    const userObjectId = toObjectId(userId);
    const months = getMonthsBack(6);
    const monthStart = months[0];

    const [materialResults, generationResults] = await Promise.all([
      Material.aggregate([
        {
          $match: {
            createdBy: userObjectId,
            createdAt: { $gte: monthStart },
          },
        },
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' },
            },
            count: { $sum: 1 },
          },
        },
      ]),
      AIGeneration.aggregate([
        {
          $match: {
            userId: userObjectId,
            createdAt: { $gte: monthStart },
          },
        },
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' },
            },
            count: { $sum: 1 },
          },
        },
      ]),
    ]);

    const materialMap = new Map<string, number>();
    const generationMap = new Map<string, number>();

    for (const r of materialResults) {
      const key = `${r._id.year}-${String(r._id.month).padStart(2, '0')}`;
      materialMap.set(key, r.count);
    }

    for (const r of generationResults) {
      const key = `${r._id.year}-${String(r._id.month).padStart(2, '0')}`;
      generationMap.set(key, r.count);
    }

    const monthlyMaterials = months.map((m) => {
      const key = `${m.getFullYear()}-${String(m.getMonth() + 1).padStart(2, '0')}`;
      return { month: formatMonth(m), count: materialMap.get(key) ?? 0 };
    });

    const monthlyGenerations = months.map((m) => {
      const key = `${m.getFullYear()}-${String(m.getMonth() + 1).padStart(2, '0')}`;
      return { month: formatMonth(m), count: generationMap.get(key) ?? 0 };
    });

    return { monthlyMaterials, monthlyGenerations };
  },
};
