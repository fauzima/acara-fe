"use client"

import EventCard from "@/components/dashboard/eventCard";
import promGuard from "@/hoc/PromGuard";
import { getEventsPromotor } from "@/libs/events";
import { IEvent } from "@/types/event";
import Link from "next/link";
import { useEffect, useState } from "react";

function OrganizerEvents() {
  type Tab = "active" | "unactive";
  const [activeTab, setActiveTab] = useState<Tab>("active");
  const [eventsActive, setEventsActive] = useState<IEvent[]>([]);
  const [eventsUnactive, setEventsUnactive] = useState<IEvent[]>([]);

  const handleClick = (tab: Tab) => {
    setActiveTab(tab);
  };

  const getActiveEvent = async () => {
    const dataActive = await getEventsPromotor("active");
    setEventsActive(dataActive);
  };

  const getUnactiveEvent = async () => {
    const dataUnactive = await getEventsPromotor("unactive");
    setEventsUnactive(dataUnactive);
  };

  useEffect(() => {
    getActiveEvent();
    getUnactiveEvent();
  }, []);

  return(
    <div className="mt-20 mx-10 justify-center">
        <button
          className={`${activeTab === "active" ? "font-bold border-b-4 border-lightBlue" : ""
            }`}
          onClick={() => handleClick("active")}
        >
          <h1 className="p-3">Event Aktif</h1>
        </button>

        <button
          className={`${activeTab === "unactive" ? "font-bold border-b-4 border-lightBlue" : ""
            }`}
          onClick={() => handleClick("unactive")}
        >
          <h1 className="p-3">Event Sebelumnya</h1>
        </button>
      {activeTab === "active" && (
        !eventsActive.length ? (
            <div className="text-center">
              <h1 className="font-semibold text-xl mb-4">Anda Belum memiliki Event apapun</h1>
              <Link href={'/create-event'} className="border px-3 py-2 rounded-md font-semibold hover:text-white border-lightBlue hover:bg-lightBlue transition duration-200">Buat Event Sekarang</Link>
            </div>
        ) : (
          <div className="w-full py-5 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {eventsActive.map((item, idx) => {
              return (
                <EventCard key={idx} event={item} />
              )
            })}
          </div>
        )
      )} {activeTab === "unactive" && (
        !eventsUnactive.length ? (
            <div className="text-center">
              <h1 className="font-semibold text-xl mb-4">Ini adalah even-even lampau</h1>
            </div>
        ) : (
          <div className="w-full py-5 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {eventsUnactive.map((item, idx) => {
              return (
                <EventCard key={idx} event={item} />
              )
            })}
          </div>
        )
      )}
    </div>
  );
}

export default promGuard(OrganizerEvents)
