"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  return (
    <div className="sticky top-0 z-10 flex h-[60px] justify-center bg-blue-800 shadow-md">
      <div className="flex gap-2">
        <Link
          href={"/organizer/signup"}
          className="inline-flex items-center rounded-lg border bg-white px-3 py-2 text-center text-sm font-medium text-black hover:bg-gray-100"
        >
          Buat Event
        </Link>
        <Link
          href={"/user/login"}
          className="inline-flex items-center rounded-lg bg-orange-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-orange-800"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
