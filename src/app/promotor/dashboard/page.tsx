"use client"

import Cards from "@/components/dashboard/cards";
//import { Charts } from "@/components/dashboard/grafik";
import TogTime from "@/components/dashboard/togTime";
import promGuard from "@/hoc/PromGuard";

function Dashboard() {
  // const {acc,isAuth, setIsAuth} = useSession()
  // const id = acc?.id

  return (
    <div className="mx-auto flex w-full max-w-screen-lg flex-col gap-10 px-4 py-20 md:px-8">
      <div>
        <Cards />
      </div>
      <div className="z-10 mx-auto flex gap-3">
        <TogTime />
      </div>
      <div className="mx-auto w-full max-w-screen-md">
       {/* // <Charts /> */}
      </div>
    </div>
  );
}
export default promGuard(Dashboard);
