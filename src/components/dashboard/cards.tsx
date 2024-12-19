"use client"

import { IData } from "@/types/data";
import { useEffect, useState } from "react";
import { MdEventNote } from "react-icons/md";

export default function Cards() {

  const [data, setData] = useState<IData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token")

  useEffect(() => {
    // Fungsi untuk mengambil data
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/dashboard/event',{
          next:{revalidate:0},
          headers:{
            "Authorization":`Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error:any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Dependensi kosong, dijalankan sekali saat komponen mount

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="mx-auto w-full max-w-screen-lg px-4 py-4 md:px-8">
      <div className="flex flex-wrap content-start gap-x-6 gap-y-6">
        <div className="group flex w-full flex-col items-center rounded-md border border-neutral-500/50 p-5 text-xl md:w-[calc(50%-12px)] xl:w-[calc(33.33%-16px)]">
          <div className="flex w-full flex-col gap-5">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-3">
                <MdEventNote className="text-2xl" />
                <p>Event Aktif</p>
              </div>
              <p>Details</p>
            </div>
            <hr className="border-neutral-500" />
            <div className="text-start">
            
              <span className="text-5xl">{data?.totalEvents}</span>
              <span> Event</span>
            </div>
          </div>
        </div>
        <div className="group flex w-full flex-col items-center rounded-md border border-neutral-500/50 p-5 text-xl md:w-[calc(50%-12px)] xl:w-[calc(33.33%-16px)]">
          <div className="flex w-full flex-col gap-5">
            <div className="flex w-full items-center justify-between">
              <p>Total Transaksi</p>
              <p>Details</p>
            </div>
            <hr className="border-neutral-500" />
            <div className="text-start">
              <span className="text-5xl">{data?.totalOrders}</span>
              <span></span>
            </div>
          </div>
        </div>
        <div className="group flex w-full flex-col items-center rounded-md border border-neutral-500/50 p-5 text-xl md:w-[calc(50%-12px)] xl:w-[calc(33.33%-16px)]">
          <div className="flex w-full flex-col gap-5">
            <div className="flex w-full items-center justify-between">
              <p>Total Tiket Terjual</p>
              <p>Details</p>
            </div>
            <hr className="border-neutral-500" />
            <div className="text-start">
              <span className="text-5xl">{data?.totalTickets}</span>
              <span> Tiket</span>
            </div>
          </div>
        </div>
        <div className="group flex w-full flex-col items-center rounded-md border border-neutral-500/50 p-5 text-xl md:w-[calc(50%-12px)] xl:w-[calc(33.33%-16px)]">
          <div className="flex w-full flex-col gap-5">
            <div className="flex w-full items-center justify-between">
              <p>Total Penjualan</p>
              <p>Details</p>
            </div>
            <hr className="border-neutral-500" />
            <div className="text-start">
              <span className="text-5xl">Rp {data?.totalProfit}</span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
