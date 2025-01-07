"use client";

import LocalStartDate from "@/components/event/localStartDate";
import rupiah from "@/helpers/toRupiah";
import { IEventHome } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoMdCalendar, IoMdPricetag } from "react-icons/io";
import { useDebounce } from "use-debounce";
import NoResult from "../../../public/noresult.png";
import AcaraLogo from "@/components/acaraLogo";
import { MdClose, MdNavigateBefore, MdNavigateNext } from "react-icons/md";

export default function SearchPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [events, setEvents] = useState<IEventHome[]>([]);
  const [value, setValue] = useState<string>(searchParams.get("title") || "");
  const [category, setCategory] = useState<string>(
    searchParams.get("category") || "",
  );
  const [location, setLocation] = useState<string>(
    searchParams.get("location") || "",
  );
  const [type, setType] = useState<string>(
    searchParams.get("type") || "upcoming",
  );
  const [page, setPage] = useState<string>(searchParams.get("page") || "1");
  const [totalPage, setTotalPage] = useState<string>("1");
  const [title] = useDebounce(value, 500);
  const [isLoading, setIsloading] = useState<boolean>(true);

  const getData = async () => {
    try {
      setIsloading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_FE!}/api/events?title=${title}&category=${category}&location=${location}&type=${type}&page=${page}`,
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

  useEffect(() => {
    router.push(pathname + "?" + createQueryString("title", title));
    setPage("1");
    getData();
  }, [title]);

  useEffect(() => {
    router.push(pathname + "?" + createQueryString("category", category));
    setPage("1");
    getData();
  }, [category]);

  useEffect(() => {
    router.push(pathname + "?" + createQueryString("location", location));
    setPage("1");
    getData();
  }, [location]);

  useEffect(() => {
    router.push(pathname + "?" + createQueryString("type", type));
    setPage("1");
    getData();
  }, [type]);

  return (
    <div className="mx-auto max-w-screen-2xl py-20">
      <div className="mx-auto mb-8 mt-5 flex max-w-4xl flex-col gap-4 px-4 md:px-8">
        <div className="group flex w-full">
          <div className="relative h-10 w-12 items-center rounded-l-full bg-blue-500/40 px-3 py-2 font-bold backdrop-blur-sm">
            <div className="absolute left-0 top-0 z-[2] size-full rounded-l-full bg-gradient-to-tr from-cyan-500 to-blue-500 opacity-0 transition-opacity group-hover:opacity-100"></div>
            <FaSearch className="pointer-events-none absolute left-0 top-0 z-[3] size-full p-[10px] pr-1 transition-colors group-hover:text-white" />
          </div>
          <input
            type="search"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Cari acara"
            className="w-full bg-transparent bg-gradient-to-r from-sky-500/10 to-cyan-500/10 px-3 text-lg md:via-neutral-50/25 md:to-cyan-500/10"
          />
          <button
            onClick={() => setValue("")}
            className="group/button relative h-10 w-12 items-center rounded-r-full bg-blue-500/40 px-3 py-2 font-bold backdrop-blur-sm hover:cursor-pointer"
          >
            <div className="absolute left-0 top-0 z-[2] size-full rounded-r-full bg-gradient-to-tr from-pink-500 to-red-500 opacity-0 transition-opacity hover:opacity-100"></div>
            <MdClose className="pointer-events-none absolute left-0 top-0 z-[3] size-full p-[5px] pr-2 transition-colors group-hover/button:text-white" />
          </button>
        </div>
        <div className="md: flex flex-col justify-center gap-8 md:flex-row md:items-center md:gap-4">
          <p className="font-semibold">Filter :</p>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-48 rounded-md bg-cyan-500/25 px-4 py-1 transition-colors hover:bg-blue-500/50"
          >
            <option value={""}>Semua kategori</option>
            <option value={"Konser"}>Konser</option>
            <option value={"Festival"}>Festival</option>
            <option value={"Pertandingan"}>Pertandingan</option>
            <option value={"Pameran"}>Pameran</option>
            <option value={"Konferensi"}>Konferensi</option>
            <option value={"Workshop"}>Workshop</option>
            <option value={"Seminar"}>Seminar</option>
            <option value={"Pelatihan"}>Pelatihan</option>
            <option value={"Sertifikasi"}>Sertifikasi</option>
          </select>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-48 rounded-md bg-cyan-500/25 px-4 py-1 transition-colors hover:bg-blue-500/50"
          >
            <option value={""}>Semua lokasi</option>
            <option value={"Jakarta"}>Jakarta</option>
            <option value={"Bandung"}>Bandung</option>
            <option value={"Yogyakarta"}>Yogyakarta</option>
            <option value={"Surabaya"}>Surabaya</option>
            <option value={"Solo"}>Solo</option>
            <option value={"Medan"}>Medan</option>
            <option value={"Bali"}>Bali</option>
          </select>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-48 rounded-md bg-cyan-500/25 px-4 py-1 transition-colors hover:bg-blue-500/50"
          >
            <option value={"upcoming"}>Acara mendatang</option>
            <option value={"previous"}>Acara lampau</option>
            <option value={""}>Semua Acara</option>
          </select>
        </div>
      </div>
      <p className="mb-8 px-4 text-2xl font-semibold md:px-8">
        Menampilkan hasil pencarian
      </p>
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
            <p className="text-xl font-bold">Tidak ada hasil yang ditemukan</p>
            <p className="mt-2">silahkan ganti kata kunci!</p>
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
                <div className="group/promotor transition-color flex items-center gap-3 bg-blue-500/10 px-6 py-4 transition hover:bg-blue-500/30 sm:rounded-b-md">
                  <Link
                    href={`/promotor/${event.name}`}
                    className="size-9 rounded-full bg-blue-500/50"
                  >
                    <Image
                      className="rounded-full object-cover object-center"
                      src={event.avatar}
                      width={50}
                      height={50}
                      alt={event.name}
                    />
                  </Link>
                  <Link
                    href={`/promotor/${event.name}`}
                    className="transition-colors hover:text-blue-700 group-hover/promotor:underline"
                  >
                    {event.name}
                  </Link>
                </div>
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
