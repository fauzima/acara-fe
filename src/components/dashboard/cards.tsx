"use client";

import { toastErr } from "@/helpers/toast";
import rupiah from "@/helpers/toRupiah";
import { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { GrCalendar, GrMoney, GrTicket, GrTransaction } from "react-icons/gr";

export default function Cards() {
  interface IData {
    icon: IconType;
    title: string;
    desc: string;
    total: string;
    unit: string;
    style: string;
  }

  const [response, setResponse] = useState<number[]>([]);
  const [loading, setisLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_FE!}/api/dashboard/summary`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await res.json();
      setResponse(data);
      setisLoading(false);
    } catch (err) {
      toastErr(err);
    }
  };

  const data: IData[] = [
    {
      icon: GrCalendar,
      title: "Acara",
      desc: "Total acara yang telah dibuat.",
      total: `${response[0]}`,
      unit: "Acara",
      style: "from-blue-600 via-cyan-500 to-blue-600 ",
    },
    {
      icon: GrTransaction,
      title: "Transaksi",
      desc: "Total transaksi dari seluruh acara.",
      total: `${response[1]}`,
      unit: "Transaksi",
      style: "from-red-600 via-pink-500 to-red-600 ",
    },
    {
      icon: GrMoney,
      title: "Penjualan",
      desc: "Total laba bruto dari seluruh transaksi.",
      total: `${rupiah(response[2])}`,
      unit: " ",
      style: "from-amber-600 via-yellow-500 to-amber-600 ",
    },
    {
      icon: GrTicket,
      title: "Tiket Terjual",
      desc: "Total tiket yang terjual dari seluruh transaksi.",
      total: `${response[3]}`,
      unit: "Tiket",
      style: "from-teal-600 via-green-500 to-teal-600 ",
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex w-full flex-wrap place-content-center content-start gap-x-6 gap-y-6">
      {data.map((item, idx) => (
        <div
          key={idx}
          className={`flex w-full max-w-md flex-col items-center rounded-xl bg-gradient-to-tl p-1 transition-all hover:brightness-110 lg:w-[calc(50%-12px)] ${item.style}`}
        >
          <div className="flex w-full flex-col">
            <div className="flex w-full items-center rounded-t-lg px-4 pb-3 pt-2 text-white">
              <div className="flex items-center gap-5">
                <item.icon className="text-3xl" />
                <div className="flex flex-col items-start gap-1">
                  <p className="text-xl font-bold">{item.title}</p>
                  <p className="text-sm">{item.desc}</p>
                </div>
              </div>
            </div>
            <div
              className={`${loading ? "animate-skeleton" : ""} rounded-b-lg bg-white/90 px-5 py-4 text-start font-semibold text-neutral-600`}
            >
              <span className="text-3xl">{loading ? 0 : item.total} </span>
              <span className="text-lg">{item.unit}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
