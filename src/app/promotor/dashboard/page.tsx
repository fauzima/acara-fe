"use client";

import Cards from "@/components/dashboard/cards";
import { GrafikEvent } from "@/components/dashboard/grafikEvent";
import { GrafikTicket } from "@/components/dashboard/grafikTiket";
import { GrafikTransaction } from "@/components/dashboard/grafikTransaction";
import Events from "@/components/dashboard/listEvent";
import TogTime from "@/components/dashboard/togTime";
import promGuard from "@/hoc/PromGuard";

function Dashboard() {
  
  return (
    <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-10 px-4 py-20 md:px-8">
      <div>
        <Cards />
      </div>
      <div className="z-10 mx-auto flex flex-row gap-3">
        <Events />
        <TogTime />
      </div>
      <div className="mx-auto lg:w-[90%] min-w-screen-md lg:gap-6 lg:flex">
        <GrafikEvent />
        <GrafikTicket />
        <GrafikTransaction />
      </div>
    </div>
  );
}
export default promGuard(Dashboard);
