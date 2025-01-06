"use client";

import React, { useEffect, useState } from "react";

interface UserPoint {
  id: string;
  point: number;
  expiredAt: string;
}

interface UserCoupon {
  userId: string;
  percentage: number;
  expiredAt: string;
}

const UserDetails: React.FC = () => {
  const [userPoint, setUserPoint] = useState<UserPoint[]>([]);
  const [userCoupon, setUserCoupon] = useState<UserCoupon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserRewards = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_FE!}/api/users/userdetail`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          next: { revalidate: 0 },
        },
      );

      if (!res.ok) {
        throw new Error("Failed to fetch customer rewards.");
      }

      const data = await res.json();
      console.log(data);
      setUserPoint(data.point);
      setUserCoupon(data.coupon);
    } catch (err) {
      console.log(err);

      setError("Something went wrong:");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserRewards();
  }, []);

  return (
    <div className="h-[50vh] bg-gray-50 p-6 md:p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-2xl font-bold text-gray-800 md:text-3xl">
          User Rewards
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="flex gap-8">
            {/* Customer Points */}
            <div>
              <h2 className="mb-4 text-xl font-semibold text-gray-700">
                User Points
              </h2>
              {userPoint.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {userPoint.map((point) => (
                    <div
                      key={point.id}
                      className="rounded-lg bg-white p-4 shadow-md transition hover:shadow-lg"
                    >
                      <p className="text-lg font-medium text-gray-800">
                        Points:{" "}
                        <span className="text-indigo-500">{point.point}</span>
                      </p>
                      <p className="text-sm text-gray-500">
                        Expired At:{" "}
                        <span className="text-red-500">
                          {new Date(point.expiredAt).toLocaleDateString()}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No points available.</p>
              )}
            </div>

            {/* Customer Coupons */}
            <div>
              <h2 className="mb-4 text-xl font-semibold text-gray-700">
                User Coupons
              </h2>
              {userCoupon.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {userCoupon.map((coupon) => (
                    <div
                      key={coupon.userId}
                      className="rounded-lg bg-white p-4 shadow-md transition hover:shadow-lg"
                    >
                      <p className="text-lg font-medium text-gray-800">
                        Discount:{" "}
                        <span className="text-green-500">
                          {coupon.percentage}%
                        </span>
                      </p>
                      <p className="text-sm text-gray-500">
                        Expired At:{" "}
                        <span className="text-red-500">
                          {new Date(coupon.expiredAt).toLocaleDateString()}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No coupons available.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
