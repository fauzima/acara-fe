"use client";

import supabase from "@/services/supabase";
import { FcGoogle } from "react-icons/fc";

export const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) {
    console.error("Error during Google sign-in", error.message);
  }
};

export default function ButtonSignIn() {
  return (
    <button
      onClick={signInWithGoogle}
      className="flex items-center gap-1 rounded-2xl border border-slate-400 px-1 py-1 font-semibold hover:bg-slate-400"
    >
      <FcGoogle className="h-5 w-5" /> login with google
    </button>
  );
}
