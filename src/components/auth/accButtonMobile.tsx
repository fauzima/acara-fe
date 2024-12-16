import { IAcc } from "@/types/account";
import Image from "next/image";
import { useState } from "react";
import AccMenuMobile from "./accMenuMobile";

export default function AccButtonMobile({ acc }: { acc: IAcc | null }) {
  const [isOpen, setOpen] = useState<boolean>(false);
  const setButton = () => {
    setOpen(!isOpen);
  };
  return (
    <div>
      <button onClick={() => setButton()} className="relative size-9">
        <Image
          className="z-[3] rounded-full object-cover"
          src={acc?.avatar || ""}
          alt={acc?.name || "name"}
          fill
          priority
        />
      </button>
      <div
        onClick={() => setButton()}
        className={`${isOpen ? "opacity-100" : "pointer-events-none opacity-0"} fixed inset-0 z-[49] bg-gradient-to-tr from-cyan-100 to-blue-100 pt-[25vh] transition-opacity`}
      >
        <AccMenuMobile closeButton={setButton} />
      </div>
    </div>
  );
}
