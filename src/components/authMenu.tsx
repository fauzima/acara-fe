"use client";
import { useSession } from "@/context/useSession";
import { deleteCookie } from "@/libs/action";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AccMenu from "./accMenu";

export default function AuthMenu() {
  const router = useRouter();
  const { acc, isAuth, setIsAuth } = useSession();
  const onLogout = () => {
    deleteCookie("token");
    setIsAuth(false);
    router.refresh();
    router.push("/");
    router.refresh();
  };
  return (
    <div>
      {isAuth ? (
        <AccMenu acc={acc} onLogout={onLogout} />
      ) : (
        <div className="flex gap-2">
          <Link
            href={"/promotor/register"}
            className="group relative h-9 w-20 items-center rounded-xl bg-white/50 px-3 py-2 text-center text-sm font-bold backdrop-blur"
          >
            <div className="absolute left-0 top-0 z-[2] size-full rounded-xl bg-gradient-to-tr from-fuchsia-500 to-blue-500 opacity-0 transition-opacity hover:opacity-100"></div>
            <p className="pointer-events-none absolute left-0 top-0 z-[3] size-full px-3 py-2 transition-colors group-hover:text-white">
              Daftar
            </p>
          </Link>
          <Link
            href={"/user/login"}
            className="group relative h-9 w-20 items-center rounded-xl bg-blue-500/50 px-3 py-2 text-center text-sm font-bold backdrop-blur"
          >
            <div className="absolute left-0 top-0 z-[2] size-full rounded-xl bg-gradient-to-tr from-fuchsia-500 to-blue-500 opacity-0 transition-opacity hover:opacity-100"></div>
            <p className="pointer-events-none absolute left-0 top-0 z-[3] size-full px-3 py-2 transition-colors group-hover:text-white">
              Masuk
            </p>
          </Link>
        </div>
      )}
    </div>
  );
}
