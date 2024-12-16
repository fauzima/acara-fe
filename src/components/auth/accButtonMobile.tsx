import { IAcc } from "@/types/account";
import Image from "next/image";
import { useState } from "react";

export default function AccButtonMobile({ acc }: { acc: IAcc | null }) {
  const [isOpen, setOpen] = useState<boolean>(false);
  const setButton = () => {
    setOpen(!isOpen);
  };
  return (
    <button className="relative size-9">
      <Image
        className="z-[3] rounded-full object-cover"
        src={acc?.avatar || ""}
        alt={acc?.name || "name"}
        fill
        priority
      />
    </button>
  );
}
