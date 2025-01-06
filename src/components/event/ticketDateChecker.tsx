"use client";

export default function TicketDateChecker({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (now < start) {
    return (
      <p className="font-semibold text-rose-600">
        Tiket belum mulai dijual!
      </p>
    );
  } else if (now > end) {
    return (
      <p className="font-semibold text-rose-600">
        Tiket sudah selesai dijual!
      </p>
    );
  } else {
    return <div></div>;
  }
}
