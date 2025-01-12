"use client";

import { useSession } from "@/context/useSession";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AccMenuDesktop from "./accMenuDesktop";
import HoverModal from "../hoverModal";
import Button from "../button";

export default function AuthDesktop() {
  const router = useRouter();
  const { acc, isAuth, setIsAuth } = useSession();
  
  const onLogout = () => {
    localStorage.removeItem("token")
    setIsAuth(false);
    router.refresh();
    router.push("/");
    router.refresh();
  };
  return (
    <div>
      {isAuth ? (
        <AccMenuDesktop acc={acc} onLogout={onLogout} />
      ) : (
        <div className="relative flex gap-2">
          <HoverModal
            trigger={<Button text="Daftar" style="w-20 bg-white/50" />}
            content={
              <div className="absolute right-0 top-full flex items-end pt-3">
                <div className="flex size-full flex-col gap-4 rounded-xl bg-gradient-to-tr from-cyan-200 to-blue-200 px-5 py-3">
                  <p className="text-center text-sm font-bold">
                    Daftarkan akun anda sekarang!
                  </p>
                  <div className="flex gap-2">
                    <Link href={"/promotor/register"} className="text-nowrap">
                      <Button
                        text="sebagai Promotor"
                        style="w-40 bg-white/50"
                      />
                    </Link>
                    <Link href={"/user/register"} className="text-nowrap">
                      <Button
                        text="sebagai Pembeli"
                        style="w-40 bg-blue-500/50"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            }
          />
          <HoverModal
            trigger={<Button text="Masuk" style="w-20 bg-blue-500/50" />}
            content={
              <div className="absolute right-0 top-full flex items-end pt-3">
                <div className="flex size-full flex-col gap-4 rounded-xl bg-gradient-to-tr from-cyan-200 to-blue-200 px-5 py-3">
                  <p className="text-center text-sm font-bold">
                    Masuk ke akun anda sekarang!
                  </p>
                  <div className="flex gap-2">
                    <Link href={"/promotor/login"} className="text-nowrap">
                      <Button
                        text="sebagai Promotor"
                        style="w-40 bg-white/50"
                      />
                    </Link>
                    <Link href={"/user/login"} className="text-nowrap">
                      <Button
                        text="sebagai Pembeli"
                        style="w-40 bg-blue-500/50"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            }
          />
        </div>
      )}
    </div>
  );
}
