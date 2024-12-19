"use client";

import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const promGuard = (WrappedComponent: React.ComponentType) => {
  const PromGuard: React.FC = (props) => {
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
      if(!storedToken) router.push("/promotor/login")

    }, [router]);

    useEffect(() => {
       if (token === null) return;

      if (!token) {
        router.push("/promotor/login");
      } else {
        const decodedUser = jwtDecode(token) as { role: "promotor" | "user" };
        if (decodedUser.role !== "promotor") {
          router.push("/");
        }
      }
    }, [router, token]);

    if (token === null) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return PromGuard;
};

export default promGuard;
