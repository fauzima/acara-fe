"use client";
import { deleteCookie } from "@/libs/action";
import { useRouter } from "next/navigation";
import { useSessionProm } from "@/context/useSessionProm";
import AvatarMenuProm from "./avatarMenuProm";
import Link from "next/link";

export const AvatarProm = () => {
  const router = useRouter();
  const { promotor, isAuth, setIsAuth } = useSessionProm();
  const onLogout = () => {
    deleteCookie("token");
    setIsAuth(false);
    router.refresh();
    router.push("/");
    router.refresh();
  };

  return (
    <>
      {isAuth ? (
        <AvatarMenuProm promotor={promotor} onLogout={onLogout} />
      ) : (
<div className="sticky top-0 z-10 flex h-[60px] justify-center bg-blue-800 shadow-md">
      <div className="flex gap-2">
        <Link
          href={"/promotor/signup"}
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
    </div>      )}
    </>
  );
};
