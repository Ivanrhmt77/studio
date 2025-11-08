import { students as dummyStudents } from '@/lib/dummy-data';
import { 
  calculateOverallStats, 
  calculateSubjectStats, 
  addAverageGrades,
  getGradeDistribution
} from '@/lib/stats';
import { Header } from '@/components/dashboard/header';
import StatsOverview from '@/components/dashboard/stats-overview';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/dashboard/student-table/data-table';
import { columns } from '@/components/dashboard/student-table/columns';
import SubjectPerformanceChart from '@/components/dashboard/subject-performance-chart';
import GradeDistributionChart from '@/components/dashboard/grade-distribution-chart';
import AiInsights from '@/components/dashboard/ai-insights';
import type { Student } from '@/lib/types';


export default function Home() {
  const studentsWithAverages: Student[] = addAverageGrades(dummyStudents);
  const overallStats = calculateOverallStats(studentsWithAverages);
  const subjectStats = calculateSubjectStats(studentsWithAverages);
  const gradeDistribution = getGradeDistribution(studentsWithAverages);

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-4 sm:p-6 md:gap-8 md:p-8">
        <StatsOverview stats={overallStats} studentCount={studentsWithAverages.length} />
        <div className="grid grid-cols-1 gap-4 md:gap-8 lg:grid-cols-7">
          <Card className="col-span-1 lg:col-span-4">
            <CardHeader>
              <CardTitle>Students</CardTitle>
              <CardDescription>An overview of all student grades.</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable columns={columns} data={studentsWithAverages} />
            </CardContent>
          </Card>
          <div className="col-span-1 lg:col-span-3 flex flex-col gap-4 md:gap-8">
            <SubjectPerformanceChart data={subjectStats} />
            <GradeDistributionChart data={gradeDistribution} />
            <AiInsights overallStats={overallStats} subjectStats={subjectStats} />
          </div>
        </div>
      </main>
    </div>
  );
}
