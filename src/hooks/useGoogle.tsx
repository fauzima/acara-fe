"use client";

import { useEffect, useState } from "react";
import supabase from "@/services/supabase";
import { User } from "@supabase/supabase-js";

export const useSessionGoogle = () => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const getSessionGoogle = () => {
    supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user);
      console.log(session);
    });
  };
  useEffect(() => {
    getSessionGoogle();
  }, []);
  return user;
};
