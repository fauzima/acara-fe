"use client";
import { useSession } from "@/context/useSession";
import AuthButtonMobile from "./authButtonMobile";
import AccButtonMobile from "./accButtonMobile";

export default function AuthhMobile() {
  const { acc, isAuth, setIsAuth } = useSession();
  return (
    <div>
      {isAuth ? (
        <AccButtonMobile acc={acc} />
      ) : (
        <AuthButtonMobile />
      )}
    </div>
  );
}
