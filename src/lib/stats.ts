import type { Student, OverallStats, SubjectStats, Grades, GradeDistribution } from './types';

const getAverage = (numbers: number[]): number => {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, val) => acc + val, 0);
  return parseFloat((sum / numbers.length).toFixed(2));
};

const getMedian = (numbers: number[]): number => {
  if (numbers.length === 0) return 0;
  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : parseFloat(((sorted[mid - 1] + sorted[mid]) / 2).toFixed(2));
};

const getStandardDeviation = (numbers: number[]): number => {
  if (numbers.length < 2) return 0;
  const mean = getAverage(numbers);
  const variance = numbers.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / (numbers.length -1);
  return parseFloat(Math.sqrt(variance).toFixed(2));
};

export const addAverageGrades = (students: Student[]): Student[] => {
  return students.map(student => {
    const grades = Object.values(student.grades);
    const averageGrade = getAverage(grades);
    return { ...student, averageGrade };
  });
};

export const calculateOverallStats = (students: Student[]): OverallStats => {
  const allAverageGrades = students.map(s => s.averageGrade).filter(g => g !== undefined) as number[];

  if (allAverageGrades.length === 0) {
    return { averageGrade: 0, medianGrade: 0, maxGrade: 0, minGrade: 0, standardDeviation: 0 };
  }

  return {
    averageGrade: getAverage(allAverageGrades),
    medianGrade: getMedian(allAverageGrades),
    maxGrade: Math.max(...allAverageGrades),
    minGrade: Math.min(...allAverageGrades),
    standardDeviation: getStandardDeviation(allAverageGrades),
  };
};

export const calculateSubjectStats = (students: Student[]): SubjectStats[] => {
  if (students.length === 0) return [];
  
  const subjects = Object.keys(students[0].grades);
  
  return subjects.map(subject => {
    const subjectGrades = students.map(s => s.grades[subject]).filter(g => g !== undefined) as number[];
    return {
      subject,
      average: getAverage(subjectGrades),
    };
  });
};

export const getGradeDistribution = (students: Student[]): GradeDistribution[] => {
  const distribution: GradeDistribution[] = [
    { name: '90-100', count: 0 },
    { name: '80-89', count: 0 },
    { name: '70-79', count: 0 },
    { name: '60-69', count: 0 },
    { name: '<60', count: 0 },
  ];

  students.forEach(student => {
    const avg = student.averageGrade;
    if (avg === undefined) return;

    if (avg >= 90) distribution[0].count++;
    else if (avg >= 80) distribution[1].count++;
    else if (avg >= 70) distribution[2].count++;
    else if (avg >= 60) distribution[3].count++;
    else distribution[4].count++;
  });

  return distribution;
};
