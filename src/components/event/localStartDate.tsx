"use client";

import dateformat from "dateformat";

export default function LocalStartDate({ time }: { time: string }) {
  return <div>{dateformat(time, "d mmm yyyy")}</div>;
}
