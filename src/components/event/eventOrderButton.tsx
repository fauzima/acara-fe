"use client";

import { useSession } from "@/context/useSession";
import Button from "../button";

export default function EventOrderButton() {
  const { acc, isAuth } = useSession();
  return (
    <>
      {acc?.role == "promotor" ? (
        <div></div>
      ) : (
        <div className="sticky bottom-0 flex w-full place-content-center bg-white/80 px-4 py-6 backdrop-blur">
          <button disabled={!isAuth} className="w-full max-w-md">
            <Button
              text={`${isAuth ? "Pesan tiket sekarang" : "Masuk terlebih dahulu untuk memesan tiket"}`}
              style={`${isAuth ? "bg-blue-500/75" : "hover:cursor-not-allowed bg-blue-200/75"} w-full`}
            />
          </button>
        </div>
      )}
    </>
  );
}
