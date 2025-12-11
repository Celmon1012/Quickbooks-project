"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { KPICard } from "@/components/widgets/KPICard";
import { PerformanceComparisonWidget } from "@/components/widgets/PerformanceComparisonWidget";
import { ProjectionsWidget } from "@/components/widgets/ProjectionsWidget";

type TimeRange = "today" | "7d" | "30d" | "3m" | "ytd";

interface DashboardGridProps {
  companyId: string;
}

export function DashboardGrid({ companyId }: DashboardGridProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>("30d");

  const timeRanges: { value: TimeRange; label: string }[] = [
    { value: "today", label: "Today" },
    { value: "7d", label: "7D" },
    { value: "30d", label: "30D" },
    { value: "3m", label: "3M" },
    { value: "ytd", label: "YTD" },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-gray-50 dark:bg-[#1a1f2e] transition-colors duration-300">
      {/* Widgets Grid - Scrollable */}
      <div className="flex-1 min-h-0 overflow-auto">
        <div className="p-6 flex flex-col gap-6">
          {/* Row 1: KPIs + Performance Comparison */}
          <div className="shrink-0 grid grid-cols-12 gap-6" style={{ height: '500px' }}>
            {/* Left: KPI Cards stacked */}
            <div className="col-span-3 flex flex-col gap-6">
              <div className="flex-1 min-h-0">
                <KPICard
                  title="Total Revenue"
                  value={2400000}
                  change={12.5}
                  format="currency"
                />
              </div>
              <div className="flex-1 min-h-0">
                <KPICard
                  title="Active Users"
                  value={14203}
                  change={8.2}
                  format="number"
                />
              </div>
            </div>

            {/* Right: Performance Comparison */}
            <div className="col-span-9">
              <PerformanceComparisonWidget companyId={companyId} />
            </div>
          </div>

          {/* Row 2: Sales vs Profit + Drop Widget - FULL WIDTH BELOW */}
          <div className="shrink-0 grid grid-cols-12 gap-6" style={{ height: '220px' }}>
            <div className="col-span-8">
              <ProjectionsWidget companyId={companyId} />
            </div>
            <div className="col-span-4">
              <div className="bg-white dark:bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-300 dark:border-white/10 h-full flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer group">
                <div className="text-center text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300">
                  <Plus className="w-6 h-6 mx-auto mb-2" />
                  <p className="text-xs font-medium">Drop Widget</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Time Range Selector - Fixed Footer */}
      <div className="shrink-0 flex items-center justify-center gap-4 py-4 px-6 border-t border-gray-200 dark:border-white/10 bg-white dark:bg-[#1a1f2e]">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Time Range:</span>
        <div className="flex items-center gap-1">
          {timeRanges.map((range) => (
            <Button
              key={range.value}
              onClick={() => setTimeRange(range.value)}
              variant="ghost"
              size="sm"
              className={
                timeRange === range.value
                  ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 font-medium hover:bg-indigo-200 dark:hover:bg-indigo-500/30"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
              }
            >
              {range.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}