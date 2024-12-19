"use client";

import { useSession } from "@/context/useSession";
import AuthButtonMobile from "./authButtonMobile";
import AccMenuMobile from "./accMenuMobile";
import { useRouter } from "next/navigation";

export default function AuthMobile() {
  const router = useRouter();
  const { acc, isAuth, setIsAuth } = useSession();
  const onLogout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
    router.refresh();
    router.push("/");
    router.refresh();
  };
  return (
    <div>
      {isAuth ? (
        <AccMenuMobile acc={acc} onLogout={onLogout} />
      ) : (
        <AuthButtonMobile />
      )}
    </div>
  );
}
