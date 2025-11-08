"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { subjects, classNames } from "@/lib/dummy-data";
import type { Student, Grades } from "@/lib/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type AddStudentFormProps = {
  onFormSubmit: (data: Omit<Student, 'id' | 'averageGrade'>) => void;
  selectedClass: string;
};

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  className: z.string(),
  ...subjects.reduce((acc, subject) => {
    acc[subject.toLowerCase()] = z.coerce.number().min(0, "Grade must be at least 0").max(100, "Grade must be at most 100");
    return acc;
  }, {} as Record<string, z.ZodNumber>)
});


export default function AddStudentForm({ onFormSubmit, selectedClass }: AddStudentFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      className: selectedClass === 'All Classes' ? 'Class A' : selectedClass,
      ...subjects.reduce((acc, subject) => {
        acc[subject.toLowerCase()] = 0;
        return acc;
      }, {} as Record<string, number>)
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { name, className, ...gradesData } = values;
    
    const grades: Grades = subjects.reduce((acc, subject) => {
        acc[subject] = gradesData[subject.toLowerCase()];
        return acc;
    }, {} as Grades);

    onFormSubmit({ name, className, grades });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Jane Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="className"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Class</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a class" />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        {classNames.filter(c => c !== 'All Classes').map(c => (
                            <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
            {subjects.map(subject => (
                <FormField
                    key={subject}
                    control={form.control}
                    name={subject.toLowerCase() as any}
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>{subject}</FormLabel>
                        <FormControl>
                            <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            ))}
        </div>
        <Button type="submit" className="w-full">Add Student</Button>
      </form>
    </Form>
  );
}
