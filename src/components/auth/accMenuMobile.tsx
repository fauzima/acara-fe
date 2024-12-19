import { IAcc } from "@/types/account";
import Image from "next/image";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import Button from "../button";
import Link from "next/link";

export default function AccMenuMobile({
  acc,
  onLogout,
}: {
  acc: IAcc | null;
  onLogout: () => void;
}) {
  const [isOpen, setOpen] = useState<boolean>(false);
  const setButton = () => {
    setOpen(!isOpen);
  };
  return (
    <div className="relative flex place-content-end items-center">
      <button
        onClick={() => setButton()}
        className={`${isOpen ? "opacity-100" : "pointer-events-none hidden opacity-0"} group absolute z-50 size-9 items-center rounded-xl bg-blue-500/25 px-3 py-2 text-center text-lg font-bold backdrop-blur-sm transition-opacity`}
      >
        <div className="absolute left-0 top-0 z-[2] size-full rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-500 opacity-0 transition-opacity hover:opacity-100"></div>
        <MdClose
          className={`pointer-events-none absolute left-0 top-0 z-[3] size-full p-1 transition-colors group-hover:text-white`}
        />
      </button>
      <button
        onClick={() => setOpen(true)}
        className={`${isOpen ? "fixed -translate-x-14 pl-4" : ""} z-50 flex h-9 place-content-end items-center rounded-full bg-white/75 py-2 text-center text-sm font-bold transition-transform`}
      >
        <p
          className={`${isOpen ? "opacity-100" : "pointer-events-none hidden opacity-0"} mr-2 text-nowrap transition-opacity`}
        >
          Halo, {acc?.name}!
        </p>
        <div className="relative size-9">
          <Image
            className="rounded-full object-cover"
            src={acc?.avatar || ""}
            alt={acc?.name || "name"}
            fill
            priority
          />
        </div>
      </button>
      <div
        onClick={() => setButton()}
        className={`${isOpen ? "opacity-100" : "pointer-events-none opacity-0"} fixed inset-0 z-[49] bg-neutral-300/50 pt-[25vh] backdrop-blur transition-opacity`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={
            "mx-4 flex flex-col gap-4 rounded-xl bg-gradient-to-tr from-cyan-200 to-blue-200 px-2 py-8"
          }
        >
          {acc?.role == "user" ? (
            <Link
              onClick={() => setButton()}
              href={"/user/profile"}
              className="flex w-full place-content-center"
            >
              <Button text="Profil" style="w-[95%] bg-white/75" />
            </Link>
          ) : (
            <Link
              onClick={() => setButton()}
              href={"/promotor/dashboard"}
              className="flex w-full place-content-center"
            >
              <Button text="Dashboard" style="w-[95%] bg-white/75" />
            </Link>
          )}
          <button
            onClick={() => onLogout()}
            className="flex w-full place-content-center"
          >
            <Button text="Keluar" style="w-[95%] bg-rose-600/75 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
