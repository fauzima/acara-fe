"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  {
    year: "2024",
    eventAktif: 86,
    totalTransaksi: 80,
    totalTiketTerjual: 60,
    totalPenjualan: 75,
    totalPengunjung: 45,
  },
];

const chartConfig = {
  eventAktif: {
    label: "Event Aktif",
    color: "#2563eb",
  },
  totalTransaksi: {
    label: "Total Transaksi",
    color: "#60a5fa",
  },
  totalTiketTerjual: {
    label: "Total Tiket terjual",
    color: "#60a5fa",
  },
  totalPenjualan: {
    label: "Total Penjualan",
    color: "#60a5fa",
  },
  totalPengunjung: {
    label: "Total Pengunjung",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export function Chart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="year"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="eventAktif" fill="var(--color-eventAktif)" radius={4} />
        <Bar dataKey="totalTransaksi" fill="var(--color-totalTransaksi)" radius={4} />
        <Bar dataKey="totalTiketTerjual" fill="var(--color-totalTiketTerjual)" radius={4} />
        <Bar dataKey="totalPenjualan" fill="var(--color-totalPenjualan)" radius={4} />
        <Bar dataKey="totalPengunjung" fill="var(--color-totalPengunjung)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
