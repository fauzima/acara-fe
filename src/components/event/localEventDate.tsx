"use client";

import { toIDstring } from "@/helpers/formatDate";

export default function LocalEventDate({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return (
    <div>
      <span>{toIDstring(start)}</span>
      <span>{" — "}</span>
      <span>{toIDstring(end)}</span>
    </div>
  );
}
