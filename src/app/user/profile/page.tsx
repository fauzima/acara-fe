"use client"

import UserDetails from "@/components/pointAndCoupon";
import { useSession } from "@/context/useSession";
import userGuard from "@/hoc/UserGuard";
import Image from "next/image";
import { RiVerifiedBadgeFill } from "react-icons/ri";

function Profile() {
  const { acc } = useSession();
  if (!acc) {
    return <div></div>;
  }
  return (
    <div className="py-24">
      <div className="flex flex-col items-center">
        <div className="h-32 w-32 overflow-hidden rounded-full border border-black bg-white lg:h-64 lg:w-64">
          <Image
            src={acc?.avatar}
            alt={acc?.name}
            height={500}
            width={500}
            priority
            className="rounded-full object-cover"
          />
        </div>
        <div className="mt-2 items-center text-2xl font-bold">{acc?.name}</div>
      </div>
      <div className="mt-3 flex flex-col items-center gap-1">
        {acc?.isVerified ? (
          <div className="flex items-center gap-2 rounded-lg text-lg font-medium text-green-600">
            <p>Verified</p>
            <RiVerifiedBadgeFill />
          </div>
        ) : (
          <div className="text-red-500">Not verified yet</div>
        )}
        <div className="text-lg">{acc?.email}</div>
        <div className="text-lg">
          Referral Code: <span className="font-bold">{acc?.refCode}</span>
        </div>
        <div className="mt-6">
            <UserDetails />
        </div>
      </div>
    </div>
  );
}
export default userGuard(Profile);