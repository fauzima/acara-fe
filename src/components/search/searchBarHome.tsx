"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdClose } from "react-icons/md";

export default function SearchBarHome() {
  const router = useRouter();
  const [value, setValue] = useState<string>("");

  const onSubmit = (value: string) => {
    if (value) {
      router.push(`/search?title=${value}&page=1`);
    } else {
      
    }
  };

  return (
    <form onSubmit={() => onSubmit(value)} className="group flex w-full">
      <button
        onClick={() => onSubmit(value)}
        className="relative h-10 w-12 items-center rounded-l-full bg-blue-500/40 px-3 py-2 font-bold backdrop-blur-sm hover:cursor-pointer"
      >
        <div className="absolute left-0 top-0 z-[2] size-full rounded-l-full bg-gradient-to-tr from-cyan-500 to-blue-500 opacity-0 transition-opacity group-hover:opacity-100"></div>
        <FaSearch className="pointer-events-none absolute left-0 top-0 z-[3] size-full p-[10px] pr-1 transition-colors group-hover:text-white" />
      </button>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Cari acara"
        className="w-full bg-transparent bg-gradient-to-r from-sky-500/10 to-cyan-500/10 px-3 text-lg md:via-neutral-50/25 md:to-cyan-500/10"
      />
      <button
        onClick={() => setValue("")}
        className="group/button relative h-10 w-12 items-center rounded-r-full bg-blue-500/40 px-3 py-2 font-bold backdrop-blur-sm hover:cursor-pointer"
      >
        <div className="absolute left-0 top-0 z-[2] size-full rounded-r-full bg-gradient-to-tr from-pink-500 to-red-500 opacity-0 transition-opacity hover:opacity-100"></div>
        <MdClose className="pointer-events-none absolute left-0 top-0 z-[3] size-full p-[5px] pr-2 transition-colors group-hover/button:text-white" />
      </button>
    </form>
  );
}
