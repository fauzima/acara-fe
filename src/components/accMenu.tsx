import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { IAcc } from "@/types/account";
import Link from "next/link";

const AccMenu = ({
  acc,
  onLogout,
}: {
  acc: IAcc | null;
  onLogout: () => void;
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div ref={dropdownRef} className="relative">
      <div
        onClick={toggleDropdown}
        className="group relative flex h-9 w-fit cursor-pointer items-center rounded-full bg-white/50 py-2 text-center text-sm font-bold backdrop-blur sm:pl-3"
      >
        <div className="absolute left-0 top-0 z-[2] hidden size-full rounded-full bg-gradient-to-tr from-fuchsia-500 to-blue-500 opacity-0 transition-opacity group-hover:opacity-100 sm:block"></div>
        <p className="z-[3] mr-2 hidden group-hover:text-white sm:block">
          Halo, {acc?.name}!
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

      <div
        className={`${isDropdownOpen ? "opacity-100" : "opacity-0"} pointer-events-none fixed inset-0 -z-[3] bg-white/25 backdrop-blur-sm transition-opacity`}
      ></div>
      <div
        className={`${isDropdownOpen ? "opacity-100" : "pointer-events-none opacity-0"} absolute right-0 top-0 -z-[1] w-fit rounded-[18px] bg-gradient-to-tr from-fuchsia-200 to-blue-200 text-sm font-bold transition-opacity sm:w-full`}
      >
        <ul className="flex w-full flex-col items-center sm:pt-10">
          <div className="flex h-9 w-fit cursor-pointer items-center rounded-full bg-white/50 py-2 pl-3 text-center text-sm font-bold backdrop-blur sm:hidden">
            <p className="z-[3] mr-[44px] text-nowrap group-hover:text-white">
              Halo, {acc?.name}!
            </p>
          </div>
          {acc?.role == "user" ? (
            <Link
              onClick={toggleDropdown}
              href={"user/profile"}
              className="w-full px-4 py-3 text-center text-gray-700 hover:bg-white/25"
            >
              Profil
            </Link>
          ) : (
            <Link
              onClick={toggleDropdown}
              href={"promotor/dashboard"}
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
  );
};

export default AccMenu;
