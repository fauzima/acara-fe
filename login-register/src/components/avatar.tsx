"use client";

import { useSession } from "@/context/useSession";
import { deleteCookie } from "@/libs/action";
import { useRouter } from "next/navigation";
import AvatarMenu from "./avatarMenu";

export const Avatar = () => {
  const router = useRouter();
  const { user, isAuth, setIsAuth } = useSession();
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
        <AvatarMenu user={user} onLogout={onLogout} />
      ) : (
        <div className="flex gap-2">
          <button
            onClick={() => router.push("/organizer/signup")}
            className="inline-flex items-center rounded-lg border bg-white px-3 py-2 text-center text-sm font-medium text-black hover:bg-gray-100"
          >
            Buat Event
          </button>
          <button
            onClick={() => router.push("/user/login")}
            className="inline-flex items-center rounded-lg bg-orange-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-orange-800"
          >
            Login
          </button>
        </div>
      )}
    </>
  );
};
