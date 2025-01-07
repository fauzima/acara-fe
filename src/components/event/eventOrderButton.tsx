"use client";

import { useSession } from "@/context/useSession";
import Button from "../button";
import Link from "next/link";

export default function EventOrderButton({
  id,
  start,
  end,
}: {
  id: string;
  start: string;
  end: string;
}) {
  const { acc, isAuth } = useSession();
  let url = `/order/${id}`;
  if (!isAuth) {
    url = "/user/login";
  }
  const now = new Date();
  const onSale = new Date(start) < now && now < new Date(end);
  return (
    <>
      {acc?.role == "promotor" ? (
        <div></div>
      ) : (
        <div className="sticky bottom-0 flex w-full place-content-center bg-white/80 px-4 py-6 backdrop-blur">
          {!onSale ? (
            <button
              disabled={true}
              className="w-full max-w-md disabled:cursor-not-allowed"
            >
              <Button
                text="Waktu masih/sudah di luar masa jual tiket"
                style="bg-rose-500/75 w-full"
              />
            </button>
          ) : (
            <Link href={url} className="w-full max-w-md">
              <Button
                text={`${isAuth ? "Pesan tiket sekarang" : "Masuk terlebih dahulu untuk memesan tiket"}`}
                style={`${isAuth ? "bg-blue-500/75" : "bg-blue-200/75"} w-full`}
              />
            </Link>
          )}
        </div>
      )}
    </>
  );
}
