"use client";

import EventCard from "@/components/dashboard/eventCard";
import promGuard from "@/hoc/PromGuard";
import { getEventsPromotor } from "@/libs/event";
import { IEventSalman } from "@/types/event";
import Link from "next/link";
import { useEffect, useState } from "react";

function OrganizerEvents() {
  type Tab = "active" | "unactive";
  const [activeTab, setActiveTab] = useState<Tab>("active");
  const [eventsActive, setEventsActive] = useState<IEventSalman[]>([]);
  const [eventsUnactive, setEventsUnactive] = useState<IEventSalman[]>([]);

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

  return (
    <div className="mx-10 mt-20 justify-center">
      <button
        className={`${
          activeTab === "active" ? "border-lightBlue border-b-4 font-bold" : ""
        }`}
        onClick={() => handleClick("active")}
      >
        <h1 className="p-3">Event Aktif</h1>
      </button>
      <button
        className={`${
          activeTab === "unactive"
            ? "border-lightBlue border-b-4 font-bold"
            : ""
        }`}
        onClick={() => handleClick("unactive")}
      >
        <h1 className="p-3">Event Sebelumnya</h1>
      </button>
      {activeTab === "active" &&
        (!eventsActive.length ? (
          <div className="text-center">
            <h1 className="mb-4 text-xl font-semibold">
              Anda Belum memiliki Event apapun
            </h1>
            <Link
              href={"/create-event"}
              className="border-lightBlue hover:bg-lightBlue rounded-md border px-3 py-2 font-semibold transition duration-200 hover:text-white"
            >
              Buat Event Sekarang
            </Link>
          </div>
        ) : (
          <div className="grid w-full grid-cols-1 gap-4 py-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {eventsActive.map((item, idx) => {
              return <EventCard key={idx} event={item} />;
            })}
          </div>
        ))}{" "}
      {activeTab === "unactive" &&
        (!eventsUnactive.length ? (
          <div className="text-center">
            <h1 className="mb-4 text-xl font-semibold">
              Ini adalah even-even lampau
            </h1>
          </div>
        ) : (
          <div className="grid w-full grid-cols-1 gap-4 py-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {eventsUnactive.map((item, idx) => {
              return <EventCard key={idx} event={item} />;
            })}
          </div>
        ))}
    </div>
  );
}

export default promGuard(OrganizerEvents);
