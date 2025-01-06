"use client";

import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const userGuard = (WrappedComponent: React.ComponentType) => {
  const UserGuard: React.FC = (props) => {
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
      if(!storedToken) router.push("/user/login")
    }, [router]);

    useEffect(() => {
      if (token === null) return;

      if (!token) {
        router.push("/user/login");
      } else {
        const decodedUser = jwtDecode(token) as { role: "promotor" | "user" };
        if (decodedUser.role !== "user") {
          router.push("/");
        }
      }
    }, [router, token]);

    if (token === null) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return UserGuard;
};

export default userGuard;