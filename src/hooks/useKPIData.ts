"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

interface KPIData {
  totalRevenue: number;
  revenueChange: number;
  netProfit: number;
  netProfitChange: number;
}

export function useKPIData(companyId: string | null) {
  const [data, setData] = useState<KPIData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchKPIData() {
      if (!companyId) {
        setData(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const supabase = createClient();
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();

        // Current period: Last 12 months
        const currentStart = new Date(year - 1, month, 1).toISOString().split("T")[0];
        const currentEnd = now.toISOString().split("T")[0];

        // Previous period: 12 months before that
        const previousStart = new Date(year - 2, month, 1).toISOString().split("T")[0];
        const previousEnd = new Date(year - 1, month, 0).toISOString().split("T")[0];

        // Fetch current period data
        const { data: currentData, error: currentError } = await supabase
          .from("monthly_pl")
          .select("revenue, net_profit")
          .eq("company_id", companyId)
          .gte("month", currentStart)
          .lte("month", currentEnd);

        if (currentError) throw currentError;

        // Fetch previous period data
        const { data: previousData, error: previousError } = await supabase
          .from("monthly_pl")
          .select("revenue, net_profit")
          .eq("company_id", companyId)
          .gte("month", previousStart)
          .lte("month", previousEnd);

        if (previousError) throw previousError;

        // Calculate totals
        const currentRevenue = (currentData || []).reduce((sum: number, row: any) => sum + (Number(row.revenue) || 0), 0);
        const previousRevenue = (previousData || []).reduce((sum: number, row: any) => sum + (Number(row.revenue) || 0), 0);
        
        const currentNetProfit = (currentData || []).reduce((sum: number, row: any) => sum + (Number(row.net_profit) || 0), 0);
        const previousNetProfit = (previousData || []).reduce((sum: number, row: any) => sum + (Number(row.net_profit) || 0), 0);

        // Calculate changes
        const revenueChange = previousRevenue !== 0 
          ? ((currentRevenue - previousRevenue) / Math.abs(previousRevenue)) * 100 
          : 0;
        
        const netProfitChange = previousNetProfit !== 0 
          ? ((currentNetProfit - previousNetProfit) / Math.abs(previousNetProfit)) * 100 
          : 0;

        setData({
          totalRevenue: currentRevenue,
          revenueChange,
          netProfit: currentNetProfit,
          netProfitChange,
        });
      } catch (err) {
        console.error("Error fetching KPI data:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch KPI data");
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchKPIData();
  }, [companyId]);

  return { data, loading, error };
}

