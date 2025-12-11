"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectionsChart } from "./ProjectionsChart";
import { useProjectionsData } from "@/hooks/useProjectionsData";
import { MoreHorizontal, TrendingUp, Calendar, AlertCircle } from "lucide-react";

interface Props {
  companyId: string;
}

export function ProjectionsWidget({ companyId }: Props) {
  const { data, insights, loading, error } = useProjectionsData(companyId);

  return (
    <Card className="bg-white dark:bg-gray-800/50 border-gray-200 dark:border-white/10 h-full shadow-sm overflow-hidden flex flex-col">
      <CardHeader className="pb-2 shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Sales vs Profit
          </CardTitle>
          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 min-h-0 overflow-hidden">
        {loading && (
          <div className="h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
            Loading projections...
          </div>
        )}

        {error && (
          <div className="h-full flex items-center justify-center text-red-500 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        {data && data.length > 0 && !loading && (
          <div className="h-full flex flex-col">
            {/* Chart */}
            <div className="flex-1 min-h-0">
              <ProjectionsChart data={data} />
            </div>

            {/* Insights */}
            {insights && insights.length > 0 && (
              <div className="border-t border-gray-100 dark:border-gray-700 pt-2 mt-2 shrink-0">
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Insights:</p>
                <ul className="space-y-1">
                  {insights.slice(0, 2).map((insight, index) => (
                    <li key={index} className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400">
                      {insight.type === "seasonality" && (
                        <Calendar className="w-3 h-3 mt-0.5 text-blue-500 dark:text-blue-400" />
                      )}
                      {insight.type === "trend" && (
                        <TrendingUp className="w-3 h-3 mt-0.5 text-green-500 dark:text-green-400" />
                      )}
                      {insight.type === "recurring" && (
                        <AlertCircle className="w-3 h-3 mt-0.5 text-orange-500 dark:text-orange-400" />
                      )}
                      <span className="line-clamp-1">{insight.message}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {data && data.length === 0 && !loading && (
          <div className="h-full flex items-center justify-center text-gray-400 dark:text-gray-500 text-sm text-center px-4">
            Projections will improve as we collect more historical data.
          </div>
        )}
      </CardContent>
    </Card>
  );
}