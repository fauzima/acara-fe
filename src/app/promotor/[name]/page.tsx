"use client";

import AcaraLogo from "@/components/acaraLogo";
import { IEventHome } from "@/types/types";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import NoResult from "../../../../public/noresult.png";
import Link from "next/link";
import { IoMdCalendar, IoMdPricetag } from "react-icons/io";
import LocalStartDate from "@/components/event/localStartDate";
import rupiah from "@/helpers/toRupiah";

export default function PromotorEventsPage({
  params,
}: {
  params: { name: string };
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [events, setEvents] = useState<IEventHome[]>([]);
  const [page, setPage] = useState<string>(searchParams.get("page") || "1");
  const [totalPage, setTotalPage] = useState<string>("1");
  const [isLoading, setIsloading] = useState<boolean>(true);

  const getData = async () => {
    try {
      setIsloading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_FE!}/api/events?promotor=${params.name}&type=&page=${page}`,
      );
      const result = await res.json();
      setEvents(result.events);
      setPage(result.page);
      setTotalPage(result.totalPage);
    } catch (err) {
      console.log(err);
    } finally {
      setIsloading(false);
    }
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  useEffect(() => {
    router.push(pathname + "?" + createQueryString("page", page));
    getData();
  }, [page]);

  return (
    <div className="mx-auto max-w-screen-2xl py-20">
      <div className="mb-8 px-4 text-2xl font-semibold md:px-8">
        Acara milik {params.name}
      </div>
      {events.length == 0 || isLoading ? (
        <div></div>
      ) : (
        <div className="mb-8 flex place-content-center items-center gap-2">
          <button
            onClick={() => setPage((parseInt(page) - 1).toString())}
            disabled={page == "1"}
            className={`group relative z-50 size-9 items-center rounded-xl bg-blue-500/25 px-3 py-2 text-center text-lg font-bold backdrop-blur-sm disabled:cursor-not-allowed disabled:bg-rose-500/25`}
          >
            <div className="absolute left-0 top-0 z-[2] size-full rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-500 opacity-0 transition-opacity hover:opacity-100"></div>
            <MdNavigateBefore className="pointer-events-none absolute left-0 top-0 z-[3] size-full p-2 transition-colors group-hover:text-white" />
          </button>
          <p className="text-lg font-semibold">
            {"Halaman " + page + " dari " + totalPage}
          </p>
          <button
            onClick={() => setPage((parseInt(page) + 1).toString())}
            disabled={page >= totalPage}
            className={`group relative z-50 size-9 items-center rounded-xl bg-blue-500/25 px-3 py-2 text-center text-lg font-bold backdrop-blur-sm disabled:cursor-not-allowed disabled:bg-rose-500/25`}
          >
            <div className="absolute left-0 top-0 z-[2] size-full rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-500 opacity-0 transition-opacity hover:opacity-100"></div>
            <MdNavigateNext className="pointer-events-none absolute left-0 top-0 z-[3] size-full p-2 transition-colors group-hover:text-white" />
          </button>
        </div>
      )}
      {isLoading ? (
        <div className="flex w-full place-content-center items-center gap-2">
          <AcaraLogo />
          <div className="loader"></div>
        </div>
      ) : events.length == 0 ? (
        <div className="flex w-full place-content-center items-center text-center">
          <div className="flex flex-col sm:rounded-lg sm:bg-blue-500/10 sm:px-24 sm:pb-8">
            <Image src={NoResult} alt="NoResult" className="max-w-xs" />
            <p className="text-xl font-bold">Tidak ada Acara</p>
            <p className="mt-2">Promotor ini belum pernah membuat Acara!</p>
          </div>
        </div>
      ) : (
        <div className="flex w-full flex-wrap content-start gap-x-4 gap-y-4 font-medium sm:gap-y-8 sm:px-4 md:px-8">
          {events.map((event, idx) => {
            return (
              <div
                key={idx}
                className="group/card relative flex w-full flex-col bg-gradient-to-tr from-blue-500/25 via-cyan-500/25 to-blue-500/30 transition sm:w-[calc(50%-16px)] sm:rounded-md lg:w-[calc(33.33%-16px)]"
              >
                <div className="absolute right-3 top-3 z-10 rounded bg-white/50 px-2 py-1 text-sm font-semibold backdrop-blur">
                  {event.category}
                </div>
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
              </div>
            );
          })}
        </div>
      )}
      {events.length == 0 || isLoading ? (
        <div></div>
      ) : (
        <div className="mt-8 flex place-content-center items-center gap-2">
          <button
            onClick={() => setPage((parseInt(page) - 1).toString())}
            disabled={page == "1"}
            className={`group relative z-50 size-9 items-center rounded-xl bg-blue-500/25 px-3 py-2 text-center text-lg font-bold backdrop-blur-sm disabled:cursor-not-allowed disabled:bg-rose-500/25`}
          >
            <div className="absolute left-0 top-0 z-[2] size-full rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-500 opacity-0 transition-opacity hover:opacity-100"></div>
            <MdNavigateBefore className="pointer-events-none absolute left-0 top-0 z-[3] size-full p-2 transition-colors group-hover:text-white" />
          </button>
          <p className="text-lg font-semibold">
            {"Halaman " + page + " dari " + totalPage}
          </p>
          <button
            onClick={() => setPage((parseInt(page) + 1).toString())}
            disabled={page >= totalPage}
            className={`group relative z-50 size-9 items-center rounded-xl bg-blue-500/25 px-3 py-2 text-center text-lg font-bold backdrop-blur-sm disabled:cursor-not-allowed disabled:bg-rose-500/25`}
          >
            <div className="absolute left-0 top-0 z-[2] size-full rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-500 opacity-0 transition-opacity hover:opacity-100"></div>
            <MdNavigateNext className="pointer-events-none absolute left-0 top-0 z-[3] size-full p-2 transition-colors group-hover:text-white" />
          </button>
        </div>
      )}
    </div>
  );
}
