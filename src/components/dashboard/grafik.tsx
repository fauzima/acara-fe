// "use client";

// import React, { useState, useEffect } from "react";
// import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartLegend,
//   ChartLegendContent,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";
// import { IData } from "@/types/data";

// const chartConfig = {
//   eventAktif: {
//     label: "event aktif",
//     color: "hsl(var(--chart-1))",
//   },
//   totalTransaksi: {
//     label: "total transaksi",
//     color: "hsl(var(--chart-2))",
//   },
//   totalTiketTerjual: {
//     label: "total tiket terjual",
//     color: "hsl(var(--chart-2))",
//   },
//   totalPenjualan: {
//     label: "total penjualan",
//     color: "hsl(var(--chart-1))",
//   },
// } satisfies ChartConfig;

// export function Charts() {
//   const [chartData, setChartData] = useState<IData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("http://localhost:8000/api/dashboard/event", {
//           next: { revalidate: 0 },
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const result:IData[] = await response.json();

//         // Format data sesuai kebutuhan grafik
//         const formattedData = result.map((item) => ({
//           eventAktif: item.totalEvents,
//           totalTransaksi: item.totalOrders,
//           totalTiketTerjual: item.totalTickets,
//           totalPenjualan: item.totalProfit,
//         }));

//         setChartData(formattedData);
//       } catch (error:any) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Grafik</CardTitle>
//         <CardDescription>Total semua dalam setahun</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <ChartContainer config={chartConfig}>
//           <AreaChart
//             accessibilityLayer
//             data={chartData} // Menggunakan data dari state
//             margin={{
//               left: 12,
//               right: 12,
//             }}
//           >
//             <CartesianGrid vertical={false} />
//             <XAxis
//               dataKey="month"
//               tickLine={false}
//               axisLine={false}
//               tickMargin={8}
//               tickFormatter={(value) => value.slice(0, 3)}
//             />
//             <ChartTooltip
//               cursor={false}
//               content={<ChartTooltipContent indicator="line" />}
//             />
//             <Area
//               dataKey="totalTransaksi"
//               type="natural"
//               fill="var(--color-totalTransaksi)"
//               fillOpacity={0.4}
//               stroke="var(--color-totalTransaksi)"
//               stackId="a"
//             />
//             <Area
//               dataKey="eventAktif"
//               type="natural"
//               fill="var(--color-eventAktif)"
//               fillOpacity={0.4}
//               stroke="var(--color-eventAktif)"
//               stackId="a"
//             />
//             <Area
//               dataKey="totalTiketTerjual"
//               type="natural"
//               fill="var(--color-totalTiketTerjual)"
//               fillOpacity={0.4}
//               stroke="var(--color-totalTiketTerjual)"
//               stackId="a"
//             />
//             <Area
//               dataKey="totalPenjualan"
//               type="natural"
//               fill="var(--color-totalPenjualan)"
//               fillOpacity={0.4}
//               stroke="var(--color-totalPenjualan)"
//               stackId="a"
//             />
//             <ChartLegend content={<ChartLegendContent />} />
//           </AreaChart>
//         </ChartContainer>
//       </CardContent>
//       <CardFooter>
//         <div className="flex w-full items-start gap-2 text-sm">
//           <div className="grid gap-2">
//             <div className="flex items-center gap-2 leading-none text-muted-foreground">
//               2024
//             </div>
//           </div>
//         </div>
//       </CardFooter>
//     </Card>
//   );
// }
