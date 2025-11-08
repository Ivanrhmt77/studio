export interface Grades {
  [subject: string]: number;
}

export interface Student {
  id: number;
  name: string;
  className: string;
  grades: Grades;
  averageGrade?: number;
}

export interface SubjectStats {
  subject: string;
  average: number;
}

export interface OverallStats {
  averageGrade: number;
  medianGrade: number;
  maxGrade: number;
  minGrade: number;
  standardDeviation: number;
}

export interface GradeDistribution {
  name: string;
  count: number;
}
