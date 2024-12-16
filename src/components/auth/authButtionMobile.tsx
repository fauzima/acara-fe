import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import AuthMenuMobile from "./authMenuMobile";

export default function AuthButtonMobile() {
  const [isOpen, setOpen] = useState<boolean>(false);
  const setButton = () => {
    setOpen(!isOpen);
  };
  return (
    <div>
      <button
        onClick={() => setButton()}
        className="group relative z-50 size-9 items-center rounded-xl bg-blue-500/25 px-3 py-2 text-center text-lg font-bold backdrop-blur-sm"
      >
        <div className="absolute left-0 top-0 z-[2] size-full rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-500 opacity-0 transition-opacity hover:opacity-100"></div>
        <GiHamburgerMenu
          className={`${isOpen ? "hidden" : "block"} pointer-events-none absolute left-0 top-0 z-[3] size-full p-2 transition-colors group-hover:text-white`}
        />
        <MdClose
          className={`${isOpen ? "block" : "hidden"} pointer-events-none absolute left-0 top-0 z-[3] size-full p-1 transition-colors group-hover:text-white`}
        />
      </button>
      <div
        className={`${isOpen ? "opacity-100" : "pointer-events-none opacity-0"} fixed inset-0 z-[49] bg-neutral-300/50 pt-[25vh] transition-opacity backdrop-blur`}
      >
        <AuthMenuMobile closeButton={setButton} />
      </div>
    </div>
  );
}
