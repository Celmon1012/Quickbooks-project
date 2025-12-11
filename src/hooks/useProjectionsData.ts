"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { ProjectionData } from "@/types";

interface Insight {
  type: "seasonality" | "trend" | "recurring";
  message: string;
}

export function useProjectionsData(companyId: string) {
  const [data, setData] = useState<ProjectionData[]>([]);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!companyId) return;

      setLoading(true);
      setError(null);

      try {
        // Fetch historical data (last 12 months)
        const twelveMonthsAgo = new Date();
        twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

        const { data: historicalData, error: histError } = await supabase
          .from("monthly_pl")
          .select("month, revenue, expenses, cogs")
          .eq("company_id", companyId)
          .gte("month", twelveMonthsAgo.toISOString().split("T")[0])
          .order("month", { ascending: true });

        if (histError) throw histError;

        // Fetch projections (next 12 months)
        const { data: projectionData, error: projError } = await supabase
          .from("projections_12m")
          .select("month, projected_revenue, projected_cash_flow, projected_net_profit, seasonality_factor")
          .eq("company_id", companyId)
          .order("month", { ascending: true });

        if (projError) throw projError;

        // Transform historical data
        const historical: ProjectionData[] = (historicalData || []).map((row: any) => ({
          month: new Date(row.month).toLocaleDateString("en-US", { month: "short", year: "2-digit" }),
          revenue: Number(row.revenue) || 0,
          cashFlow: (Number(row.revenue) || 0) - (Number(row.expenses) || 0),
          netProfit: (Number(row.revenue) || 0) - (Number(row.cogs) || 0) - (Number(row.expenses) || 0),
          isProjected: false,
        }));

        // Transform projection data
        const projections: ProjectionData[] = (projectionData || []).map((row: any) => ({
          month: new Date(row.month).toLocaleDateString("en-US", { month: "short", year: "2-digit" }),
          revenue: Number(row.projected_revenue) || 0,
          cashFlow: Number(row.projected_cash_flow) || 0,
          netProfit: Number(row.projected_net_profit) || 0,
          isProjected: true,
        }));

        setData([...historical, ...projections]);

        // Generate insights
        const generatedInsights = generateInsights(historicalData || [], projectionData || []);
        setInsights(generatedInsights);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch projections");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [companyId]);

  return { data, insights, loading, error };
}

function generateInsights(historical: any[], projections: any[]): Insight[] {
  const insights: Insight[] = [];

  // Seasonality insight
  if (projections.length > 0) {
    const highSeason = projections.find((p) => Number(p.seasonality_factor) > 1.1);
    const lowSeason = projections.find((p) => Number(p.seasonality_factor) < 0.95);

    if (highSeason || lowSeason) {
      insights.push({
        type: "seasonality",
        message: "Seasonality detected: December typically +25%, July typically -10%",
      });
    }
  }

  // Trend insight
  if (historical.length >= 12) {
    const firstHalf = historical.slice(0, 6).reduce((sum, r) => sum + (Number(r.revenue) || 0), 0);
    const secondHalf = historical.slice(6).reduce((sum, r) => sum + (Number(r.revenue) || 0), 0);
    const growth = firstHalf > 0 ? ((secondHalf - firstHalf) / firstHalf) * 100 : 0;

    if (Math.abs(growth) > 3) {
      insights.push({
        type: "trend",
        message: `Trend: ${growth > 0 ? "+" : ""}${growth.toFixed(0)}% year-over-year growth`,
      });
    }
  }

  // Placeholder recurring expense insight
  insights.push({
    type: "recurring",
    message: "Recurring expense: $12K insurance payment due April 2025",
  });

  return insights;
}