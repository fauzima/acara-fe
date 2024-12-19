import Link from "next/link";
import { useState } from "react";
import Button from "../button";

export default function AuthMenuMobile({
  closeButton,
}: {
  closeButton: () => void;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const setButton = (index: number) => {
    setActiveIndex(activeIndex == index ? null : index);
  };
  const click = () => {
    closeButton();
    setActiveIndex(null);
  };
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={
        "mx-4 flex flex-col gap-2 rounded-xl bg-gradient-to-tr from-cyan-200 to-blue-200 px-2 py-8"
      }
    >
      <div className="mb-4 px-3 text-center text-3xl font-semibold">
        <span>Daftar/masuk ke akun </span>
        <span className="max-w-fit bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text font-bold tracking-wide text-transparent">
          acara.com
        </span>
        <span> anda sekarang!</span>
      </div>
      <button
        onClick={() => setButton(1)}
        className="flex w-full place-content-center"
      >
        <Button text="Daftar" style="w-[95%] bg-white/50" />
      </button>
      <div
        className={`${activeIndex == 1 ? "h-fit scale-y-100 py-3" : "h-0 scale-y-0 py-0"} flex w-full justify-center gap-3 overflow-hidden transition-transform`}
      >
        <Link
          onClick={() => click()}
          href={"/promotor/register"}
          className="w-[45%] text-nowrap"
        >
          <Button text="sebagai Promotor" style="w-full bg-white/50" />
        </Link>
        <Link
          onClick={() => click()}
          href={"/user/register"}
          className="w-[45%] text-nowrap"
        >
          <Button text="sebagai Pembeli" style="w-full bg-blue-500/50" />
        </Link>
      </div>
      <button
        onClick={() => setButton(2)}
        className="flex w-full place-content-center"
      >
        <Button text="Masuk" style="w-[95%] bg-blue-500/50" />
      </button>
      <div
        className={`${activeIndex == 2 ? "h-fit scale-y-100 py-3" : "h-0 scale-y-0 py-0"} flex w-full justify-center gap-3 overflow-hidden transition-transform`}
      >
        <Link
          onClick={() => click()}
          href={"/promotor/login"}
          className="w-[45%] text-nowrap"
        >
          <Button text="sebagai Promotor" style="w-full bg-white/50" />
        </Link>
        <Link
          onClick={() => click()}
          href={"/user/login"}
          className="w-[45%] text-nowrap"
        >
          <Button text="sebagai Pembeli" style="w-full bg-blue-500/50" />
        </Link>
      </div>
    </div>
  );
}
