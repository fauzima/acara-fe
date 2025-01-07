"use client";

import { toIDstring } from "@/helpers/formatDate";

export default function LocalStartDate({ time }: { time: string }) {
  return <div>{toIDstring(new Date(time))}</div>;
}
