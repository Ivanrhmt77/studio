import StatCard from "./stat-card";
import { UsersRound, Percent, Medal, TrendingUp, TrendingDown, Sigma } from "lucide-react";
import type { OverallStats } from "@/lib/types";

interface StatsOverviewProps {
  stats: OverallStats;
  studentCount: number;
}

export default function StatsOverview({ stats, studentCount }: StatsOverviewProps) {
  const { averageGrade, medianGrade, maxGrade, minGrade, standardDeviation } = stats;

  const statCards = [
    { title: "Total Students", value: studentCount, icon: UsersRound },
    { title: "Average Grade", value: `${averageGrade}%`, icon: Percent },
    { title: "Median Grade", value: `${medianGrade}%`, icon: Medal },
    { title: "Highest Grade", value: `${maxGrade}%`, icon: TrendingUp },
    { title: "Lowest Grade", value: `${minGrade}%`, icon: TrendingDown },
    { title: "Std. Deviation", value: standardDeviation, icon: Sigma },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
      {statCards.map((stat) => (
        <StatCard key={stat.title} title={stat.title} value={stat.value} icon={stat.icon} />
      ))}
    </div>
  );
}
