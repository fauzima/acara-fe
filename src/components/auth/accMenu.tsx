import Image from "next/image";
import { IAcc } from "@/types/account";
import Link from "next/link";
import HoverModal from "../hoverModal";
import { useState } from "react";

const AccMenu = ({
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
      className="relative "
    >
      <HoverModal
        trigger={
          <div className="group relative flex h-9 w-fit items-center rounded-full bg-white/50 py-2 pl-4 text-center text-sm font-bold backdrop-blur-sm">
            <div className="absolute left-0 top-0 z-[2] size-full rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500 opacity-0 transition-opacity group-hover:opacity-100"></div>
            <p className="z-[3] mr-2 transition-colors group-hover:text-white">
              {isChanged ? `Halo, ${acc?.name}!` : "Akun Saya"}
            </p>
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
          <div className="absolute right-0 flex w-40 items-end pt-3">
            <div className="w-full rounded-xl bg-gradient-to-tr from-cyan-200 to-blue-200 text-sm font-bold">
              <ul className="flex w-full flex-col items-center">
                {acc?.role == "user" ? (
                  <Link
                    href={"/user/profile"}
                    className="w-full px-4 py-3 text-center text-gray-700 hover:bg-white/25"
                  >
                    Profil
                  </Link>
                ) : (
                  <Link
                    href={"/promotor/dashboard"}
                    className="w-full px-4 py-3 text-center text-gray-700 hover:bg-white/25"
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={onLogout}
                  className="w-full px-4 py-3 text-center text-red-600 hover:bg-white/25"
                >
                  Keluar
                </button>
              </ul>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default AccMenu;
