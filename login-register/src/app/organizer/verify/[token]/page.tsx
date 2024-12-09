"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function VerifyPage({ params }: { params: { token: string } }) {
  const router = useRouter()
    const onVerify = async () => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/auth/promotor/verify/${params.token}`,
        {
          method: "PATCH",
        }
      );
      const result = await res.json();
      if(!res.ok) throw result;
      toast.success(result.message)
      console.log(result)
      router.push("/organizer/login")
    } catch (error:any) {
        console.log(error)
        toast.error(error.message)
        router.push("/")
    }
  };
  useEffect(()=>{
    onVerify()
  },[])
  return (
    <div className="flex justify-center min-h-screen items-center">
      {/* <button onClick={onVerify} className="inline-flex items-center px-3 py-2 text-sm bg-teal-400 rounded-md">
        Verifikasi
      </button> */}
    </div>
  );
}