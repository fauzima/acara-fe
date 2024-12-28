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
  total_ticket: {
    label: "Total Ticket",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface IDataTicket {
  month: string;
  total_ticket: number;
}

export function GrafikTicket() {
  const [chartData, setChartData] = useState<IDataTicket[] | null>(null);
  console.log(chartData);

  const getChartData = async () => {
    const res = await fetch(
      "http://localhost:8000/api/dashboard/ticket",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        next: { revalidate: 0 },
      },
    );
    const result = await res.json();
    console.log(result);
    setChartData(result.result);
  };

  useEffect(() => {
    getChartData();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Grafik Total Ticket</CardTitle>
        <CardDescription>January - April 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData!}
            layout="vertical"
            margin={{
              left: -20,
            }}
          >
            <XAxis type="number" dataKey="total_ticket" />
            <YAxis
              dataKey="month"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Bar dataKey="total_ticket" fill="var(--color-total_ticket)" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total tickets for the last 4 months
        </div>
      </CardFooter>
    </Card>
  );
}
