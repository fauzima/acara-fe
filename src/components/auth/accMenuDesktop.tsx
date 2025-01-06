import Image from "next/image";
import { IAcc } from "@/types/account";
import Link from "next/link";
import HoverModal from "../hoverModal";
import { useState } from "react";
import {
  MdAccountCircle,
  MdCreate,
  MdDashboard,
  MdLogout,
} from "react-icons/md";

const AccMenuDesktop = ({
  acc,
  onLogout,
}: {
  acc: IAcc | null;
  onLogout: () => void;
}) => {
  const [isChanged, setChange] = useState<boolean>(false);
  return (
    <div
      onMouseEnter={() => setChange(true)}
      onMouseLeave={() => setChange(false)}
      className="relative"
    >
      <HoverModal
        trigger={
          <div className="group relative flex h-9 w-fit items-center rounded-full bg-white/50 py-2 pl-2 text-center text-sm font-bold backdrop-blur-sm">
            <div className="absolute left-0 top-0 z-[2] size-full rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500 opacity-0 transition-opacity group-hover:opacity-100"></div>
            <div className="z-[3] mr-2 transition-colors group-hover:text-white">
              {isChanged ? (
                <div className="flex items-center gap-1">
                  <p className="text-lg">👋</p>
                  <p className="text-nowrap">Halo, {acc?.name}!</p>
                </div>
              ) : (
                <div className="flex items-center gap-[6px]">
                  <MdAccountCircle className="size-5 text-neutral-800" />
                  <p className="text-nowrap">Akun Saya</p>
                </div>
              )}
            </div>
            <div className="relative size-9">
              <Image
                className="z-[3] rounded-full object-cover"
                src={acc?.avatar || ""}
                alt={acc?.name || "name"}
                fill
                priority
              />
            </div>
          </div>
        }
        content={
          <div className="absolute right-0 flex items-end pt-3">
            <div className="w-full rounded-xl bg-gradient-to-tr from-cyan-200 to-blue-200 text-sm font-bold">
              <ul className="flex w-full flex-col items-center">
                {acc?.role == "user" ? (
                  <Link
                    href={"/user/profile"}
                    className="flex w-full flex-row-reverse items-center gap-3 rounded-t-xl py-3 pl-12 pr-6 text-neutral-800 transition-colors hover:bg-blue-600/60 hover:text-white"
                  >
                    <MdAccountCircle className="size-6" />
                    <p>Profil</p>
                  </Link>
                ) : (
                  <div className="flex w-full flex-col items-center">
                    <Link
                      href={"/promotor/create"}
                      className="flex w-full flex-row-reverse items-center gap-3 text-nowrap rounded-t-xl py-3 pl-12 pr-6 text-neutral-800 transition-colors hover:bg-blue-600/60 hover:text-white"
                    >
                      <MdCreate className="size-6" />
                      <p className="text-end">Buat Acara</p>
                    </Link>
                    <Link
                      href={"/promotor/dashboard"}
                      className="flex w-full flex-row-reverse items-center gap-3 py-3 pl-12 pr-6 text-neutral-800 transition-colors hover:bg-blue-600/60 hover:text-white"
                    >
                      <MdDashboard className="size-6" />
                      <p className="text-end">Dashboard</p>
                    </Link>
                  </div>
                )}
                <button
                  onClick={onLogout}
                  className="flex w-full flex-row-reverse items-center gap-3 rounded-b-xl py-3 pl-12 pr-6 text-rose-600 transition-colors hover:bg-rose-600/60 hover:text-white"
                >
                  <MdLogout className="size-6" />
                  <p>Keluar</p>
                </button>
              </ul>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default AccMenuDesktop;
