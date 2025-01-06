import { FaSearch } from "react-icons/fa";

export default function SearchBarHome() {
  return (
    <div className="group flex w-full">
      <div className="relative h-10 w-12 items-center rounded-l-full bg-blue-500/40 px-3 py-2 font-bold backdrop-blur-sm">
        <div className="absolute left-0 top-0 z-[2] size-full rounded-l-full bg-gradient-to-tr from-cyan-500 to-blue-500 opacity-0 transition-opacity group-hover:opacity-100"></div>
        <FaSearch className="pointer-events-none absolute left-0 top-0 z-[3] size-full p-[10px] pr-1 transition-colors group-hover:text-white" />
      </div>
      <input
        type="search"
        placeholder="Cari acara"
        className="w-full rounded-r-full bg-transparent bg-gradient-to-r from-sky-500/10 to-cyan-500/10 px-3 md:via-neutral-50/25 md:to-cyan-500/10 text-lg"
      />
    </div>
  );
}
