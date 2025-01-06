"use client"

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const afterAuthGuard = (WrappedComponent: React.ComponentType) => {
  const AfterAuthGuard: React.FC = (props) => {
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);

      if (storedToken) {
        router.push("/");
      }
    }, [router]);

    if (token) {
      router.push("/");
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return AfterAuthGuard;
};
export default afterAuthGuard;
