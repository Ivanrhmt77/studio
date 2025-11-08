"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Student } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const getGradeBadgeVariant = (grade: number) => {
  if (grade >= 90) return "default";
  if (grade >= 80) return "secondary";
  if (grade >= 70) return "outline";
  return "destructive";
};

export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
  },
  {
    accessorKey: "grades.Math",
    header: () => <div className="text-center">Math</div>,
    cell: ({ row }) => <div className="text-center">{row.original.grades.Math}</div>,
  },
  {
    accessorKey: "grades.Science",
    header: () => <div className="text-center">Science</div>,
    cell: ({ row }) => <div className="text-center">{row.original.grades.Science}</div>,
  },
  {
    accessorKey: "grades.English",
    header: () => <div className="text-center">English</div>,
    cell: ({ row }) => <div className="text-center">{row.original.grades.English}</div>,
  },
  {
    accessorKey: "grades.History",
    header: () => <div className="text-center">History</div>,
    cell: ({ row }) => <div className="text-center">{row.original.grades.History}</div>,
  },
  {
    accessorKey: "averageGrade",
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Average
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const average = row.original.averageGrade || 0;
      return (
        <div className="text-right font-medium">
          <Badge variant={getGradeBadgeVariant(average)} className="w-16 justify-center">
            {average.toFixed(2)}%
          </Badge>
        </div>
      );
    },
  },
];
