"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { PerformanceData, TimePeriod, Metric } from "@/types";

export function usePerformanceData(
  companyId: string,
  timePeriod: TimePeriod,
  metric: Metric
) {
  const [data, setData] = useState<PerformanceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!companyId) return;

      setLoading(true);
      setError(null);

      try {
        const { currentStart, currentEnd, compareStart, compareEnd, currentLabel, compareLabel } =
          getDateRanges(timePeriod);

        // Fetch current period
        const { data: currentData, error: currentError } = await supabase
          .from("monthly_pl")
          .select("revenue, cogs, expenses")
          .eq("company_id", companyId)
          .gte("month", currentStart)
          .lte("month", currentEnd);

        if (currentError) throw currentError;

        // Fetch comparison period
        const { data: compareData, error: compareError } = await supabase
          .from("monthly_pl")
          .select("revenue, cogs, expenses")
          .eq("company_id", companyId)
          .gte("month", compareStart)
          .lte("month", compareEnd);

        if (compareError) throw compareError;

        // Calculate metrics
        const currentValue = calculateMetric(currentData || [], metric);
        const compareValue = calculateMetric(compareData || [], metric);
        const changeAmount = currentValue - compareValue;
        const changePercentage = compareValue !== 0 ? (changeAmount / Math.abs(compareValue)) * 100 : 0;

        // Determine if positive (reversed for COGS and Fixed Overhead)
        const isReversedMetric = metric === "cogs" || metric === "fixed_overhead";
        const isPositive = isReversedMetric ? changeAmount < 0 : changeAmount > 0;

        setData({
          currentPeriod: {
            label: currentLabel,
            value: currentValue,
          },
          comparisonPeriod: {
            label: compareLabel,
            value: compareValue,
          },
          change: {
            amount: changeAmount,
            percentage: changePercentage,
            isPositive,
          },
          relatedMetrics: getRelatedMetrics(currentData || [], compareData || [], metric),
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [companyId, timePeriod, metric]);

  return { data, loading, error };
}

function getDateRanges(timePeriod: TimePeriod) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  let currentStart: string;
  let currentEnd: string;
  let compareStart: string;
  let compareEnd: string;
  let currentLabel: string;
  let compareLabel: string;

  switch (timePeriod) {
    case "last_month_vs_previous":
      currentStart = new Date(year, month - 1, 1).toISOString().split("T")[0];
      currentEnd = new Date(year, month, 0).toISOString().split("T")[0];
      compareStart = new Date(year, month - 2, 1).toISOString().split("T")[0];
      compareEnd = new Date(year, month - 1, 0).toISOString().split("T")[0];
      currentLabel = formatMonthLabel(new Date(year, month - 1, 1));
      compareLabel = formatMonthLabel(new Date(year, month - 2, 1));
      break;

    case "this_month_vs_last_year":
    default:
      currentStart = new Date(year, month, 1).toISOString().split("T")[0];
      currentEnd = now.toISOString().split("T")[0];
      compareStart = new Date(year - 1, month, 1).toISOString().split("T")[0];
      compareEnd = new Date(year - 1, month + 1, 0).toISOString().split("T")[0];
      currentLabel = formatMonthLabel(new Date(year, month, 1));
      compareLabel = formatMonthLabel(new Date(year - 1, month, 1));
      break;
  }

  return { currentStart, currentEnd, compareStart, compareEnd, currentLabel, compareLabel };
}

function formatMonthLabel(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function calculateMetric(data: any[], metric: Metric): number {
  if (!data || data.length === 0) return 0;

  const totals = data.reduce(
    (acc, row) => ({
      revenue: acc.revenue + (Number(row.revenue) || 0),
      cogs: acc.cogs + (Number(row.cogs) || 0),
      expenses: acc.expenses + (Number(row.expenses) || 0),
    }),
    { revenue: 0, cogs: 0, expenses: 0 }
  );

  switch (metric) {
    case "gross_revenue":
      return totals.revenue;
    case "cogs":
      return totals.cogs;
    case "gross_margin":
      return totals.revenue - totals.cogs;
    case "fixed_overhead":
      return totals.expenses;
    case "net_margin":
      return totals.revenue - totals.cogs - totals.expenses;
    default:
      return 0;
  }
}

function getRelatedMetrics(currentData: any[], compareData: any[], metric: Metric) {
  const current = {
    revenue: currentData.reduce((sum, r) => sum + (Number(r.revenue) || 0), 0),
    cogs: currentData.reduce((sum, r) => sum + (Number(r.cogs) || 0), 0),
    expenses: currentData.reduce((sum, r) => sum + (Number(r.expenses) || 0), 0),
  };

  const compare = {
    revenue: compareData.reduce((sum, r) => sum + (Number(r.revenue) || 0), 0),
    cogs: compareData.reduce((sum, r) => sum + (Number(r.cogs) || 0), 0),
    expenses: compareData.reduce((sum, r) => sum + (Number(r.expenses) || 0), 0),
  };

  const calcChange = (curr: number, prev: number) =>
    prev !== 0 ? ((curr - prev) / Math.abs(prev)) * 100 : 0;

  switch (metric) {
    case "gross_margin":
      return [
        { name: "Revenue", value: current.revenue, change: calcChange(current.revenue, compare.revenue) },
        { name: "COGS", value: current.cogs, change: calcChange(current.cogs, compare.cogs) },
      ];
    case "net_margin":
      return [
        { name: "Gross Margin", value: current.revenue - current.cogs, change: calcChange(current.revenue - current.cogs, compare.revenue - compare.cogs) },
        { name: "Fixed Overhead", value: current.expenses, change: calcChange(current.expenses, compare.expenses) },
      ];
    case "gross_revenue":
      return [
        { name: "COGS", value: current.cogs, change: calcChange(current.cogs, compare.cogs) },
        { name: "Gross Margin", value: current.revenue - current.cogs, change: calcChange(current.revenue - current.cogs, compare.revenue - compare.cogs) },
      ];
    default:
      return [
        { name: "Revenue", value: current.revenue, change: calcChange(current.revenue, compare.revenue) },
        { name: "Net Margin", value: current.revenue - current.cogs - current.expenses, change: calcChange(current.revenue - current.cogs - current.expenses, compare.revenue - compare.cogs - compare.expenses) },
      ];
  }
}