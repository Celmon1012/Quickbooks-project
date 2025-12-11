"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import { formatCurrency } from "@/lib/utils";
import { Metric } from "@/types";

interface Props {
  currentPeriod: { label: string; value: number };
  comparisonPeriod: { label: string; value: number };
  isPositive: boolean;
  metric: Metric;
}

export function ComparisonChart({
  currentPeriod,
  comparisonPeriod,
  isPositive,
  metric,
}: Props) {
  const data = [
    { period: currentPeriod.label, value: currentPeriod.value },
    { period: comparisonPeriod.label, value: comparisonPeriod.value },
  ];

  // For COGS and Fixed Overhead, colors are reversed
  const isReversedMetric = metric === "cogs" || metric === "fixed_overhead";
  
  const getBarColor = (index: number) => {
    if (index === 0) {
      // Current period
      return isPositive ? "#22c55e" : "#ef4444"; // green or red
    }
    // Comparison period - always gray
    return "#d1d5db";
  };

  return (
    <div className="h-full min-h-[80px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ left: 20, right: 60 }}>
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="period"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#6b7280" }}
            width={80}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(index)} />
            ))}
            <LabelList
              dataKey="value"
              position="right"
              formatter={(value: any) => formatCurrency(Number(value))}
              style={{ fontSize: 12, fontWeight: 500 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}