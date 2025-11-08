"use server";

import {
  generateInsightsFromStats,
  type GenerateInsightsFromStatsInput,
} from "@/ai/flows/generate-insights-from-stats";
import type { OverallStats, SubjectStats } from "@/lib/types";

export async function getAiInsightsAction(
  overallStats: OverallStats,
  subjectStats: SubjectStats[]
) {
  try {
    const subjectAverages = subjectStats.reduce((acc, subject) => {
      acc[subject.subject] = subject.average;
      return acc;
    }, {} as Record<string, number>);

    const input: GenerateInsightsFromStatsInput = {
      averageGrade: overallStats.averageGrade,
      medianGrade: overallStats.medianGrade,
      maxGrade: overallStats.maxGrade,
      minGrade: overallStats.minGrade,
      standardDeviation: overallStats.standardDeviation,
      subjectAverages: subjectAverages,
    };

    const result = await generateInsightsFromStats(input);
    return { success: true, insights: result.insights };
  } catch (error) {
    console.error("Error generating AI insights:", error);
    return { success: false, error: "Failed to generate insights. Please try again." };
  }
}
