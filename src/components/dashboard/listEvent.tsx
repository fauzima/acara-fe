import Button from "../button";
import Link from "next/link";

const Events = () => {
  return (
    <div className="relative">
      <div className="right-0 flex w-full items-end">
        <Link href={"/promotor/dashboard/events"}>
          <Button text="events" style="w-32 bg-blue-500/50" />
        </Link>
      </div>
    </div>
  );
};

export default Events;
