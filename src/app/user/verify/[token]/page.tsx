"use client";

import Button from "@/components/button";
import { toastErr } from "@/helpers/toast";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function VerifyPage({ params }: { params: { token: string } }) {
  const router = useRouter();
  const onVerify = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_FE!}/api/auth/user/verify/${params.token}`,
        {
          method: "PATCH",
        },
      );
      const result = await res.json();
      if (!res.ok) throw result;
      toast.success(result.message);
      router.push("/user/login");
    } catch (error) {
      console.log(error);
      toastErr(error);
      router.push("/");
    }
  };
  // useEffect(() => {
  //   onVerify();
  // }, []);
  return (
    <div className="mx-auto flex max-w-screen-xl place-content-center p-[20vh] px-4 md:px-8">
      <div className="flex w-full flex-col gap-5 rounded-xl bg-gradient-to-tr from-cyan-200 to-blue-200 px-3 py-8 sm:bg-none md:p-0">
        <p className="px-3 text-center text-xl font-bold">
          Klik tombol di bawah untuk verifikasi akun anda
        </p>
        <div className="mx-auto flex w-full max-w-md flex-col items-center">
          <button onClick={onVerify} className="w-full">
            <Button text="Verifikasi" style="bg-blue-500/50 w-full" />
          </button>
        </div>
      </div>
    </div>
  );
}
