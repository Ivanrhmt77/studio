import type { Student } from './types';

export const students: Student[] = [
  { id: 1, name: 'Alice Johnson', className: 'Class A', grades: { Math: 85, Science: 92, English: 88, History: 95 } },
  { id: 2, name: 'Bob Smith', className: 'Class A', grades: { Math: 72, Science: 65, English: 78, History: 82 } },
  { id: 3, name: 'Charlie Brown', className: 'Class A', grades: { Math: 95, Science: 98, English: 91, History: 96 } },
  { id: 4, name: 'Diana Prince', className: 'Class A', grades: { Math: 68, Science: 71, English: 62, History: 65 } },
  { id: 5, name: 'Ethan Hunt', className: 'Class A', grades: { Math: 88, Science: 90, English: 85, History: 89 } },
  { id: 6, name: 'Fiona Glenanne', className: 'Class B', grades: { Math: 78, Science: 82, English: 80, History: 75 } },
  { id: 7, name: 'George Costanza', className: 'Class B', grades: { Math: 55, Science: 48, English: 60, History: 52 } },
  { id: 8, name: 'Hannah Montana', className: 'Class B', grades: { Math: 92, Science: 88, English: 95, History: 94 } },
  { id: 9, name: 'Ian Malcolm', className: 'Class B', grades: { Math: 81, Science: 85, English: 79, History: 83 } },
  { id: 10, name: 'Jane Doe', className: 'Class B', grades: { Math: 90, Science: 89, English: 92, History: 91 } },
  { id: 11, name: 'Kyle Broflovski', className: 'Class C', grades: { Math: 76, Science: 70, English: 74, History: 72 } },
  { id: 12, name: 'Laura Palmer', className: 'Class C', grades: { Math: 63, Science: 68, English: 71, History: 66 } },
  { id: 13, name: 'Michael Scott', className: 'Class C', grades: { Math: 70, Science: 75, English: 68, History: 73 } },
  { id: 14, name: 'Nancy Drew', className: 'Class C', grades: { Math: 98, Science: 97, English: 99, History: 100 } },
  { id: 15, name: 'Oscar Martinez', className: 'Class C', grades: { Math: 89, Science: 91, English: 87, History: 93 } },
  { id: 16, name: 'Pam Beesly', className: 'Class A', grades: { Math: 82, Science: 78, English: 84, History: 80 } },
  { id: 17, name: 'Quentin Coldwater', className: 'Class B', grades: { Math: 91, Science: 94, English: 89, History: 92 } },
  { id: 18, name: 'Rachel Green', className: 'Class B', grades: { Math: 77, Science: 72, English: 81, History: 79 } },
  { id: 19, name: 'Steve Rogers', className: 'Class C', grades: { Math: 93, Science: 95, English: 90, History: 97 } },
  { id: 20, name: 'Tony Stark', className: 'Class C', grades: { Math: 100, Science: 99, English: 98, History: 99 } },
];

export const subjects = ['Math', 'Science', 'English', 'History'];

export const classNames = ['All Classes', 'Class A', 'Class B', 'Class C'];
