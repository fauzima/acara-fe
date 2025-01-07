"use client";

import { toIDstring } from "@/helpers/formatDate";

export default function LocalTicketDate({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) {
  const now = new Date();
  const start = toIDstring(new Date(startDate));
  const end = toIDstring(new Date(endDate));

  return (
    <div>
      {now < new Date(startDate) ? (
        <p className="text-rose-600">Penjualan dimulai tanggal {start}</p>
      ) : now > new Date(endDate) ? (
        <p className="text-rose-600">
          Penjualan sudah selesai sejak tanggal {end}
        </p>
      ) : (
        <p>{start + " — " + end}</p>
      )}
    </div>
  );
}
