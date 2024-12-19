"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { IAcc } from "@/types/account";

interface SessionContextProps {
  isAuth: boolean;
  acc: IAcc | null;
  setIsAuth: (isAuth: boolean) => void;
  setAcc: (Acc: IAcc | null) => void;
}

const SessionContext = createContext<SessionContextProps | undefined>(
  undefined,
);

export const SessionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [acc, setAcc] = useState<IAcc | null>(null);

  const checkSession = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Login First");
        return;
      }
      const res = await fetch("http://localhost:8000/api/auth/session", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json();
      if (!res.ok) throw result;
      setAcc(result.acc);
      setIsAuth(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <SessionContext.Provider value={{ isAuth, acc, setIsAuth, setAcc }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = (): SessionContextProps => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
