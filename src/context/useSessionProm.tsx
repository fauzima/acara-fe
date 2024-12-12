"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { IProm } from "@/types/prom";

interface SessionContextProps {
  isAuth: boolean;
  promotor: IProm | null;
  setIsAuth: (isAuth: boolean) => void;
  setProm: (promotor: IProm | null) => void;
}

const SessionContext = createContext<SessionContextProps | undefined>(
  undefined
);

export const SessionProviderProm: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [promotor, setProm] = useState<IProm | null>(null);

  const checkSession = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/promotors/profile", {
        method: "GET",
        credentials: "include",
      });
      const result = await res.json();
      if (!res.ok) throw result;
      setProm(result.promotor);
      setIsAuth(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <SessionContext.Provider value={{ isAuth, promotor, setIsAuth, setProm }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSessionProm = (): SessionContextProps => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};