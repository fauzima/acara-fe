"use client";

import dateformat from "dateformat";

export default function LocalTicketDate({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  return (
    <div className={`${now < start || now > end ? "text-rose-600" : ""}`}>
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
