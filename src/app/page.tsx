import LocalStartDate from "@/components/event/localStartDate";
import SearchBarHome from "@/components/search/searchBarHome";
import rupiah from "@/helpers/toRupiah";
import { getEvents } from "@/libs/event";
import { IEventHome } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { IoMdCalendar, IoMdPricetag } from "react-icons/io";

export default async function Home() {
  const event: IEventHome[] = await getEvents();
  return (
    <div className="mx-auto max-w-screen-2xl py-20">
      <div className="mx-auto mb-10 mt-5 max-w-4xl px-4 md:px-8">
        <SearchBarHome />
      </div>
      <p className="mb-8 px-4 text-2xl font-semibold md:px-8">
        Acara yang akan datang
      </p>
      <div className="flex w-full flex-wrap content-start gap-x-4 gap-y-6 font-medium sm:gap-y-4 sm:px-4 md:px-8">
        {event.slice(0, 6).map((event, idx) => {
          return (
            <div
              key={idx}
              className="group/card relative flex w-full flex-col bg-gradient-to-tr from-blue-500/25 via-cyan-500/25 to-blue-500/30 transition sm:w-[calc(50%-16px)] sm:rounded-md lg:w-[calc(33.33%-16px)]"
            >
              <Link
                href={`/`}
                className="transition-color absolute right-3 top-3 z-10 rounded bg-white/50 px-2 py-1 text-sm font-semibold backdrop-blur hover:text-blue-700 hover:underline"
              >
                {event.category}
              </Link>
              <Link
                href={`/event/${event.id}`}
                className="group/event flex flex-col transition sm:rounded-t-md"
              >
                <div className="aspect-[2/1] w-full overflow-hidden bg-blue-500/10 sm:rounded-t-md">
                  <Image
                    className="size-full object-cover object-center text-center transition-transform sm:rounded-t-md sm:group-hover/card:scale-105"
                    priority
                    src={event.thumbnail}
                    width={1000}
                    height={500}
                    alt={event.title}
                  />
                </div>
                <div className="transition-color flex flex-grow flex-col gap-2 px-6 py-3 group-hover/event:bg-blue-500/30">
                  <p className="line-clamp-1 text-lg font-bold transition-colors hover:text-blue-700 group-hover/event:underline">
                    {event.title}
                  </p>
                  <div className="flex items-center gap-2">
                    <IoMdCalendar className="size-5" />
                    <LocalStartDate time={event.startDate} />
                  </div>
                  <div className="flex items-center gap-2">
                    <IoMdPricetag className="size-5" />
                    <p>{rupiah(event.price)}</p>
                  </div>
                </div>
              </Link>
              <div className="group/promotor transition-color flex items-center gap-3 bg-blue-500/10 px-6 py-4 transition hover:bg-blue-500/30 sm:rounded-b-md">
                <div className="size-9 rounded-full bg-blue-500/50 hover:cursor-pointer">
                  <Image
                    className="rounded-full object-cover object-center"
                    src={event.avatar}
                    width={50}
                    height={50}
                    alt={event.name}
                  />
                </div>
                <div className="transition-colors hover:cursor-pointer hover:text-blue-700 group-hover/promotor:underline">
                  {event.name}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
