import Cards from "@/components/dashboard/cards";
import { Chart } from "@/components/dashboard/grafik";
import TogTime from "@/components/dashboard/togTime";
import TogType from "@/components/dashboard/togType";

export default function Dashboard() {
  return (
    <div className="mx-auto w-full max-w-screen-lg px-4 py-4 md:px-8 flex flex-col gap-10">
      <div>
      <Cards />
      </div>
      <div className="flex gap-3 mx-auto">
        <TogTime />
        <TogType />
      </div>
      <div className="max-w-screen-md mx-auto">
      <Chart />
      </div>

    </div>
  );
}
