// Time Period Options
export type TimePeriod =
  | "last_week_vs_previous"
  | "last_month_vs_previous"
  | "last_quarter_vs_previous"
  | "last_year_vs_previous"
  | "this_week_vs_last_year"
  | "this_month_vs_last_year"
  | "this_quarter_vs_last_year"
  | "this_year_vs_last_year";

// Metric Options
export type Metric =
  | "gross_revenue"
  | "cogs"
  | "gross_margin"
  | "fixed_overhead"
  | "net_margin";

// Performance Data
export interface PerformanceData {
  currentPeriod: {
    label: string;
    value: number;
  };
  comparisonPeriod: {
    label: string;
    value: number;
  };
  change: {
    amount: number;
    percentage: number;
    isPositive: boolean;
  };
  relatedMetrics: RelatedMetric[];
}

export interface RelatedMetric {
  name: string;
  value: number;
  change: number;
}

// Projection Data
export interface ProjectionData {
  month: string;
  revenue: number;
  cashFlow: number;
  netProfit: number;
  isProjected: boolean;
}

// Company
export interface Company {
  id: string;
  name: string;
  logo_url?: string;
  realm_id?: string;
}

// Widget
export interface Widget {
  id: string;
  type: "kpi" | "chart" | "comparison" | "projection";
  title: string;
  config: Record<string, any>;
}

// Time Range
export type TimeRange = "today" | "7d" | "30d" | "3m" | "ytd";