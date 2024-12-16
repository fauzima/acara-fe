import { FaSearch } from "react-icons/fa";

export default function SearchMenuMobile() {
  return (
    <div>
      <button className="group relative size-9 items-center rounded-xl bg-blue-500/25 px-3 py-2 text-center text-lg font-bold backdrop-blur-sm">
        <div className="absolute left-0 top-0 z-[2] size-full rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-500 opacity-0 transition-opacity hover:opacity-100"></div>
        <FaSearch className="pointer-events-none absolute left-0 top-0 z-[3] size-full p-[9px] transition-colors group-hover:text-white" />
      </button>
    </div>
  );
}
