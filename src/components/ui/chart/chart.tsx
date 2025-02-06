import * as React from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts"
import { ChartContainer } from "./chart-container"
import { ChartLegend, ChartLegendContent } from "./legend"
import { ChartTooltip, ChartTooltipContent } from "./tooltip"

interface ChartProps {
  data: any[]
  categories: string[]
  index: string
  colors?: string[]
  valueFormatter?: (value: number) => string
  className?: string
}

export function Chart({
  data,
  categories,
  index,
  colors = ["#2563eb"],
  valueFormatter = (value: number) => value.toString(),
  className,
}: ChartProps) {
  const config = categories.reduce(
    (acc, category, i) => ({
      ...acc,
      [category]: {
        color: colors[i % colors.length],
      },
    }),
    {}
  )

  return (
    <ChartContainer className={className} config={config}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis
          dataKey={index}
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={valueFormatter}
        />
        <ChartTooltip
          content={({ active, payload }) => {
            if (!active || !payload) return null

            return (
              <div className="rounded-lg border bg-background p-2 shadow-sm">
                <div className="grid gap-2">
                  {payload.map((category: any, i: number) => (
                    <div key={`${category.name}-${i}`} className="flex gap-2">
                      <div className="flex w-full flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          {category.name}
                        </span>
                        <span className="font-bold text-muted-foreground">
                          {valueFormatter(category.value)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          }}
        />
        {categories.map((category, i) => (
          <Bar
            key={category}
            dataKey={category}
            fill={colors[i % colors.length]}
          />
        ))}
      </BarChart>
    </ChartContainer>
  )
}