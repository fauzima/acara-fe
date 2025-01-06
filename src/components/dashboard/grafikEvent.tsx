"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
// const chartData = [
//   { month: "January", desktop: 5 },
//   { month: "February", desktop: 6 },
//   { month: "March", desktop: 7 },
//   { month: "April", desktop: 4 },
// ];

const chartConfig = {
  event_active: {
    label: "acara aktif",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface IDataEvent {
  year: string;
  event_active: number;
}

export function GrafikEvent() {
  const [chartData, setChartData] = useState<IDataEvent[] | null>(null);
  // console.log(chartData);

  const getChartData = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_FE!}/api/dashboard/eventaktif`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      next: { revalidate: 0 },
    });
    const result = await res.json();
    // console.log(result);
    setChartData(result.result);
  };

  useEffect(() => {
    getChartData();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Grafik Total Event</CardTitle>
        <CardDescription>2024-2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData!}
            layout="vertical"
            margin={{
              left: -15,
            }}
          >
            <XAxis type="number" dataKey="event_active" />
            <YAxis
              dataKey="year"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              // tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar
              dataKey="event_active"
              fill="var(--color-event_active)"
              radius={5}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total Events for the last 2 year
        </div>
      </CardFooter>
    </Card>
  );
}
