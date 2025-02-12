import { JobListing } from "@/types/jobs";

export interface MarketInsight {
  type: "skill" | "salary" | "location" | "industry";
  title: string;
  description: string;
  trend: "up" | "down" | "stable";
  percentage?: number;
  recommendation?: string;
}

export const generateMarketInsights = async (
  jobs: JobListing[],
): Promise<MarketInsight[]> => {
  // In a real app, this would analyze real job market data
  // For now, we'll return mock insights
  return [
    {
      type: "skill",
      title: "React Native in High Demand",
      description:
        "75% of mobile development roles require React Native experience",
      trend: "up",
      percentage: 75,
      recommendation:
        "Consider learning React Native to expand your mobile development opportunities",
    },
    {
      type: "salary",
      title: "Senior Developer Salaries Rising",
      description: "Average salaries up 12% year-over-year",
      trend: "up",
      percentage: 12,
      recommendation:
        "Focus on senior-level skills to maximize earning potential",
    },
    {
      type: "location",
      title: "Remote Work Opportunities Growing",
      description: "60% of new positions offer remote options",
      trend: "up",
      percentage: 60,
      recommendation: "Highlight remote work experience in your profile",
    },
    {
      type: "industry",
      title: "FinTech Sector Expansion",
      description: "FinTech companies increasing tech hiring by 25%",
      trend: "up",
      percentage: 25,
      recommendation:
        "Consider adding financial domain knowledge to your skill set",
    },
  ];
};

export const getSkillGrowthRate = (skill: string): number => {
  // In a real app, this would use actual market data
  const mockGrowthRates: Record<string, number> = {
    React: 15,
    TypeScript: 20,
    Python: 18,
    AWS: 25,
    Docker: 22,
    Kubernetes: 30,
    GraphQL: 28,
    "Node.js": 12,
    "Vue.js": 10,
    Angular: 5,
  };

  return mockGrowthRates[skill] || 0;
};

export const getSalaryTrends = async (
  role: string,
  location: string,
): Promise<{
  average: number;
  range: { min: number; max: number };
  trend: number;
}> => {
  // Mock salary data
  return {
    average: 120000,
    range: { min: 90000, max: 150000 },
    trend: 8, // 8% increase
  };
};
