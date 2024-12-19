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
    total: string;
    unit: string;
    style: string;
  }

  const [response, setResponse] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_FE!}/api/dashboard/summary`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setResponse(data);
      setLoading(false);
    } catch (err) {
      toastErr(err);
    }
  };

  const data: IData[] = [
    {
      icon: GrCalendar,
      title: "Acara Aktif",
      total: `${response[0]}`,
      unit: "Acara",
      style: "from-blue-600 via-cyan-500 to-blue-600 ",
    },
    {
      icon: GrTransaction,
      title: "Total Transaksi",
      total: `${response[1]}`,
      unit: "Transaksi",
      style: "from-red-600 via-pink-500 to-red-600 ",
    },
    {
      icon: GrMoney,
      title: "Total Penjualan",
      total: `${rupiah(response[2])}`,
      unit: "",
      style: "from-amber-600 via-yellow-500 to-amber-600 ",
    },
    {
      icon: GrTicket,
      title: "Total Tiket Terjual",
      total: `${response[3]}`,
      unit: "Tiket",
      style: "from-teal-600 via-green-500 to-teal-600 ",
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex w-full flex-wrap content-start gap-x-6 gap-y-6">
      {data.map((item, idx) => (
        <div
          key={idx}
          className={`group flex w-full flex-col items-center rounded-xl bg-gradient-to-tl p-1 text-xl transition-all hover:brightness-125 md:w-[calc(50%-12px)] ${item.style}`}
        >
          <div className="flex w-full flex-col">
            <div className="flex w-full items-center rounded-t-lg px-5 py-3 font-bold text-white">
              <div className="flex items-center gap-5">
                <item.icon className="text-2xl" />
                <p>{item.title}</p>
              </div>
            </div>
            <div className="text- rounded-b-lg bg-white px-5 py-4 text-start">
              <span className="text-4xl">{loading ? 0 : item.total} </span>
              <span className="text-xl">{item.unit}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
