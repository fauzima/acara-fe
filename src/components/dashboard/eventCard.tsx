import { displayDate, formatDate } from "@/helpers/formatDate";
import { IEvent } from "@/types/event";
import Image from "next/image";
import Link from "next/link";

export default function EventCard({ event }: { event: IEvent }) {
  const date = displayDate(
    formatDate(event.startDate),
    formatDate(event.endDate),
  );
  console.log(event);
  return (
    <Link
      href={`/promotor/dashboard/events/${event.id}`}
      className="flex h-auto w-full flex-col overflow-hidden rounded-md shadow-[0px_0px_5px_-1px_rgba(0,0,0,0.75)]"
    >
      <div className="relative aspect-[4/3] w-full">
        <Image src={event.thumbnail} alt={event.title} fill />
      </div>
      <div className="flex flex-grow flex-col gap-1 p-2">
        <h2 className="line-clamp-2 font-semibold">{event.title}</h2>
        <div className="font-[450] text-slate-500">{date}</div>
      </div>
    </Link>
  );
}
