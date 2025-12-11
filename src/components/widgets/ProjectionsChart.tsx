"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
} from "recharts";
import { formatCurrency } from "@/lib/utils";
import { ProjectionData } from "@/types";

interface Props {
  data: ProjectionData[];
}

export function ProjectionsChart({ data }: Props) {
  // Find the index where projections start
  const projectionStartIndex = data.findIndex((d) => d.isProjected);
  const projectionStartMonth = projectionStartIndex >= 0 ? data[projectionStartIndex].month : null;

  return (
    <div className="h-full min-h-[60px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 10, fill: "#6b7280" }}
            tickLine={false}
            axisLine={{ stroke: "#e5e7eb" }}
          />
          <YAxis
            tick={{ fontSize: 10, fill: "#6b7280" }}
            tickLine={false}
            axisLine={{ stroke: "#e5e7eb" }}
            tickFormatter={(value) => formatCurrency(value)}
            width={60}
          />
          <Tooltip
            formatter={(value: number) => formatCurrency(value)}
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "12px",
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: "11px" }}
            iconType="line"
          />

          {/* Vertical line separating historical and projected */}
          {projectionStartMonth && (
            <ReferenceLine
              x={projectionStartMonth}
              stroke="#9ca3af"
              strokeDasharray="5 5"
              label={{
                value: "Projected →",
                position: "top",
                fontSize: 10,
                fill: "#9ca3af",
              }}
            />
          )}

          {/* Revenue Line */}
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#22c55e"
            strokeWidth={2}
            dot={false}
            strokeDasharray="5 5"
            name="Revenue"
          />

          {/* Cash Flow Line */}
          <Line
            type="monotone"
            dataKey="cashFlow"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            name="Cash Flow"
          />

          {/* Net Profit Line */}
          <Line
            type="monotone"
            dataKey="netProfit"
            stroke="#a855f7"
            strokeWidth={2}
            dot={false}
            name="Net Profit"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}