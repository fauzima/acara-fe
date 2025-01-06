"use client";

import dateformat from "dateformat";

export default function LocalEventDate({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) {
  return (
    <div>
      <span>{dateformat(startDate, "d mmm yyyy")}</span>
      <span>{", "}</span>
      <span>{dateformat(startDate, "HH:MM")}</span>
      <span>{" — "}</span>
      <span>{dateformat(endDate, "d mmm yyyy")}</span>
      <span>{", "}</span>
      <span>{dateformat(endDate, "HH:MM")}</span>
    </div>
  );
}
