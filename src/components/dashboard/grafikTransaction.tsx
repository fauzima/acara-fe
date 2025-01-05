"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useEffect, useState } from "react"
// const chartData = [
//   { month: "January", desktop: 186 },
//   { month: "February", desktop: 305 },
//   { month: "March", desktop: 237 },
//   { month: "April", desktop: 73 },
//   { month: "May", desktop: 209 },
//   { month: "June", desktop: 214 },
// ]

const chartConfig = {
  finalPrice: {
    label: "finalPrice",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

interface IDataTransaction {
  finalPrice: number;
  expiredAt: string;
}

export function GrafikTransaction() {
  const [chartData, setChartData] = useState<IDataTransaction[]>([]);
    console.log(chartData);
  
    const getChartData = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_FE!}/api/dashboard/transaction`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          next: { revalidate: 0 },
        },
      );
      const result = await res.json();
      setChartData(result);
    };
  
    useEffect(() => {
      getChartData();
    }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Grafik Total Transaction</CardTitle>
        <CardDescription>
          Showing total transaction for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData!}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="expiredAt"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
            <Area
              dataKey="finalPrice"
              type="linear"
              fill="var(--color-finalPrice)"
              fillOpacity={0.4}
              stroke="var(--color-finalPrice)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Day
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
