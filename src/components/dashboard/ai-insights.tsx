"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";
import { getAiInsightsAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import type { OverallStats, SubjectStats } from "@/lib/types";

interface AiInsightsProps {
    overallStats: OverallStats;
    subjectStats: SubjectStats[];
}

export default function AiInsights({ overallStats, subjectStats }: AiInsightsProps) {
  const [insights, setInsights] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { toast } = useToast();

  const handleGenerateInsights = async () => {
    setIsLoading(true);
    setInsights("");
    const result = await getAiInsightsAction(overallStats, subjectStats);
    setIsLoading(false);
    if (result.success) {
      setInsights(result.insights);
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <CardTitle>AI-Powered Insights</CardTitle>
        </div>
        <CardDescription>
          Let AI analyze the data and provide key insights.
        </CardDescription>
      </CardHeader>
      <CardContent className="min-h-[100px]">
        {isLoading && (
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Generating insights...</span>
            </div>
        )}
        {insights && (
            <div className="text-sm text-foreground whitespace-pre-wrap">{insights}</div>
        )}
        {!isLoading && !insights && (
            <div className="flex items-center justify-center text-sm text-muted-foreground">
                Click the button below to generate insights.
            </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleGenerateInsights} disabled={isLoading} className="w-full">
            <Sparkles className="mr-2 h-4 w-4" />
            Generate Insights
        </Button>
      </CardFooter>
    </Card>
  );
}
